# Lokalproducerat i Väst AB

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
  "has_connected_producers": '1', // 1 = yes, 0 = no
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
