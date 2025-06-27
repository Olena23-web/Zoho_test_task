# Zoho_test_task
Zoho test task
# Додаток для роботи з курсом валют у Zoho Creator

Цей додаток автоматизує отримання курсу USD з API НБУ та оновлення даних у Zoho CRM з обробкою помилок.

## 📌 Вимоги
- Аккаунт Zoho Creator (або Zoho One)
- Доступ до Zoho CRM
- Права адміністратора/розробника в додатку

## 🚀 Інструкція з запуску

### 1. Створення форми для логування помилок
1. У вашому додатку Zoho Creator натисніть **"Create New Form"**
2. Назвіть її `Error_Logs`
3. Додайте поля:
   - `Error_Type` (Single Line Text)
   - `Error_Message` (Multi Line Text)
   - `Record_ID` (Single Line Text)
   - `Timestamp` (DateTime)

### 2. Налаштування з'єднання з API НБУ
1. Перейдіть у **Setup** → **Connections**
2. Додайте нове з'єднання:
   - Тип: **API**
   - Назва: `nburequest`
   - URL: `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`
   - Метод: GET
   - Таймаут: 30 сек

### 3. Імплементація коду
Додайте ці скрипти до вашої форми/воркфлоу:

#### Для отримання курсу (`getExchangeRate`):
```deluge
// Код з кроку 2 попередньої інструкції