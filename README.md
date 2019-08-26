# Lokalproducerat i Väst AB

## API

Base URL: `https://lokalproducerativast.se/wp-json/tivala/v1`

Models are defined using: http://www.jsond.org/

### Get Producers

- `GET /producerlist -> #profile`

**profile.jsond**

```
{
  "name": 'Dalis Gård',
  "logo_url": 'https://lokalproducerativast.se/wp-content/uploads/producers/8i12tkxe5n4feos.jpg',
  "cover_image_url: '',
  "category": 'Fisk och skaldjur',
  "latitude": 58.7055,
  "longitude": 14.1261,
  "Description": "A bunch of text",
  "map_direction_link": 'https://blabla.se/1235',
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
