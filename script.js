<script>
document.addEventListener("DOMContentLoaded", function() {
  const dealId = ZOHO.CRM.Storage.get("recordId");
  const updateBtn = document.getElementById("update-btn");
  
  // 1. Отримання курсу НБУ
  fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json")
    .then(response => response.json())
    .then(nbuData => {
      const nbuRate = parseFloat(nbuData[0].rate).toFixed(2);
      document.getElementById("nbu-rate").textContent = nbuRate;
      
      // 2. Отримання курсу з угоди
      ZOHO.CRM.API.getRecord({
        Entity: "Deals",
        RecordID: dealId
      }).then(function(crmData) {
        const dealRate = parseFloat(crmData.data[0].Currency_Rate) || 0;
        document.getElementById("deal-rate").textContent = dealRate.toFixed(2);
        
        // 3. Розрахунок різниці
        const difference = ((dealRate / nbuRate - 1) * 100).toFixed(1);
        document.getElementById("difference").textContent = difference;
        
        // 4. Відображення кнопки при різниці ≥5%
        if (Math.abs(difference) >= 5) {
          updateBtn.style.display = "block";
        }
        
        // 5. Обробник кліку на кнопку
        updateBtn.addEventListener("click", function() {
          ZOHO.CRM.API.updateRecord({
            Entity: "Deals",
            APIData: { "Currency_Rate": nbuRate },
            RecordID: dealId
          }).then(function() {
            alert("Курс оновлено до " + nbuRate + " ₴");
            location.reload();
          });
        });
      });
    })
    .catch(error => {
      console.error("Помилка:", error);
      document.getElementById("nbu-rate").textContent = "Помилка завантаження";
    });
});
</script>