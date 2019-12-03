# Lokalproducerat i Väst AB

## Dokumentation, Android

1. Klona projektets repository.

2. Installera Android studio.
Instruktioner finns på deras sida.

3. Se till att ordna en fungerande emulator:
I Android Studio:
Tools -> AVD Manager, Välj en emulator i listan eller skapa en ny.
Se till att den kör. Man kan behöva slå på en virtualiseringskonfiguration inuti
BIOS, AS kommer isådana fall att fråga om detta.

4. Installera react native (följ instruktioner under Getting Started på deras sida 
och bli bekant med de vanligaste kommandon som beskrivs där).

5. Normalt byggs appen med föjande steg:
	1. Starta emulatorn
	2. cd android && ./gradlew clean
	3. react-native run-android
	Om man fortfarande får ett fel här har man antingen gjort något galet eller
	så måste man mounta om emulatorn med följande steg:
		1. Stäng av emulatorn, koppla ur ev. telefon
		2. adb uninstall android
		3. Vid output "success" kan man starta samma emulator på nytt

6. För att bygga en APK
	1. cd android && ./gradlew clean
	2. ./gradlew assembleRelease
	3. APK:n finns sparad i android/app/build/outputs/apk

7. För att bygga en AAB (Krävs för att ladda upp till google)
	1. Öka versionCode i android/build.gradle
	2. ./gradlew clean
	3. ./gradlew bundleRelease
	4  android/app/build/outputs/aab


## API V1

Base URL: `https://lokalproducerativast.se/wp-json/tivala/v1`

Models are defined using: http://www.jsond.org/

### Get Producers V1

- `GET /producerlist -> #producerlist`

**producerlist.jsond**

```
{
  "business_name": 'Dalis Gård',
  "logo_url": 'https://lokalproducerativast.se/wp-content/uploads/producers/8i12tkxe5n4feos.jpg',
  "cover_image_url: '',
  "latitude": 58.7055,
  "longitude": 14.1261,
  "Description": "A bunch of text",
  "producer_category_1": true, // matfest,
  "producer_category_2": false, // lpiv,
  "Contact_person": "Anders Svensson",
  "Visiting_adress": "Kogatan 12",
  "City": "Tidaholm",
  "email": "anders@provider.com",
  "Phone": "0731234567",
  "Website": "http://www.example.com",
  "Producer_store_category_1": true,
  "Producer_store_category_2": true,
  "Producer_store_category_3": true,
  "Opening_hours": "00:00 - 23:00"
}
```

## API V2

Base URL: `https://lokalproducerativast.se/wp-json/tivala/v2`

### Get Producers V2 (Restaurang)

- `GET /producerlist/1 -> #producerlist`

**producerlist/1.jsond**

```
{
  "business_name": 'Dalis Gård',
  "logo_url": 'https://lokalproducerativast.se/wp-content/uploads/producers/8i12tkxe5n4feos.jpg',
  "cover_image_url: '',
  "latitude": 58.7055,
  "longitude": 14.1261,
  "Description": "A bunch of text",
  "producer_category_1": true, // Matfest,
  "producer_category_2": false, // Lokalproducerat i Väst,
  "producer_category_3": false, // Smaka på Västsverige,
  "producer_category_4": false, // Lokal Meny,
  "Contact_person": "Anders Svensson",
  "Visiting_adress": "Kogatan 12",
  "City": "Tidaholm",
  "email": "anders@provider.com",
  "Phone": "0731234567",
  "Website": "http://www.example.com",
  "Opening_hours": "00:00 - 23:00"
}
```

### Get Producers V2 (Producent)

- `GET /producerlist/2 -> #producerlist`

**producerlist/2.jsond**

```
{
  "business_name": 'Dalis Gård',
  "logo_url": 'https://lokalproducerativast.se/wp-content/uploads/producers/8i12tkxe5n4feos.jpg',
  "cover_image_url: '',
  "latitude": 58.7055,
  "longitude": 14.1261,
  "Description": "A bunch of text",
  "producer_category_1": true, // Matfest,
  "producer_category_2": false, // Lokalproducerat i Väst,
  "producer_category_3": false, // Smaka på Västsverige,
  "producer_category_4": false, // Lokal Meny,
  "Contact_person": "Anders Svensson",
  "Visiting_adress": "Kogatan 12",
  "City": "Tidaholm",
  "email": "anders@provider.com",
  "Phone": "0731234567",
  "Website": "http://www.example.com",
  "Opening_hours": "00:00 - 23:00"
}
```

### Get Producers V2 (Gårdsbutik)

- `GET /producerlist/3 -> #producerlist`

**producerlist/3.jsond**

```
{
  "business_name": 'Dalis Gård',
  "logo_url": 'https://lokalproducerativast.se/wp-content/uploads/producers/8i12tkxe5n4feos.jpg',
  "cover_image_url: '',
  "latitude": 58.7055,
  "longitude": 14.1261,
  "Description": "A bunch of text",
  "producer_category_1": true, // Matfest,
  "producer_category_2": false, // Lokalproducerat i Väst,
  "producer_category_3": false, // Smaka på Västsverige,
  "producer_category_4": false, // Lokal Meny,
  "Contact_person": "Anders Svensson",
  "Visiting_adress": "Kogatan 12",
  "City": "Tidaholm",
  "email": "anders@provider.com",
  "Phone": "0731234567",
  "Website": "http://www.example.com",
  "Opening_hours": "00:00 - 23:00"
}
```

### Get Events V2

- `GET /eventlist -> #eventlist`

**eventlist.jsond**

```
{
  "event_name": 'Matfestivalen i Skövde',
  "event_sub_title": '2019-10-18 | Skövde | 20:00-21:00',
  "event_information": '',
  "event_contact_information": '',
  "logo_image_url": 'https://lokalproducerativast.se/wp-content/uploads/logo.png',
  "cover_image_url": 'https://lokalproducerativast.se/wp-content/uploads/cover.png',
  "has_connected_producers": true,
  "connected_producers": ["producer"],
}
```

### Get Global list V2

- `GET /globallist -> #globallist`

**globallist.jsond**

```
{
  "business_name": 'Dalis Gård',
  "logo_url": 'https://lokalproducerativast.se/wp-content/uploads/producers/8i12tkxe5n4feos.jpg',
  "cover_image_url: '',
  "latitude": 58.7055,
  "longitude": 14.1261,
  "Description": "A bunch of text",
  "producer_category_1": true, // Matfest,
  "producer_category_2": false, // Lokalproducerat i Väst,
  "producer_category_3": false, // Smaka på Västsverige,
  "producer_category_4": false, // Lokal Meny,
  "Contact_person": "Anders Svensson",
  "Visiting_adress": "Kogatan 12",
  "City": "Tidaholm",
  "email": "anders@provider.com",
  "Phone": "0731234567",
  "Website": "http://www.example.com",
  "search_tags": "searchtag1 searchtag2 searchtag3"
}
```
