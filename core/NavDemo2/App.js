import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, FlatList, Platform, ImageBackground, TouchableOpacity, AppRegistry, StatusBar } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator} from "react-navigation";
import MapView, { PROVIDER_GOOGLE, Marker, navigator } from 'react-native-maps';
import { Button, ListItem, Card, SearchBar, Headers } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';

import { Buffer } from 'buffer'

import type { Region } from 'react-native-maps';

export interface LatLng {
  latitude: number;
  longitude: number
}

const VÄSTRA_GÖTALAND = {
  latitude: 58.2528,
  longitude: 12.77,
  latitudeDelta: 3.2,
  longitudeDelta: 3.2
};

const producer_list = [
  {
      business_name: "Alvar och Ivars Surdegsbageri",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/xiolaxkmy0zttk5.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/t8g4javcrwv7o6m.jpeg",
      latitude: "57.6939967",
      longitude: "11.9551836",
      description: "alvar & ivar surdegsbageri är ett litet kvartersbageri i Linnéstan. Här bakas riktiga surdegsbröd av olika slag och bullar och kakor på ett hantverksmässigt sätt. Tillverkningen är eko-certifierad enligt Eu:s regler. Här finns också stans kanske minsta kaféhörna, där man kan fika eller äta frukost samtidigt som man ser bagarna arbeta. Företaget har också en egen äppelodling med musteri på Tjörn, alvar & ivar på kalvhagen.\n\nÖppettider:\nsöndag -måndag: stängt\ntisdag:   7-14\nons-fre  7-18\nlörd 8-14 \nSemesterstängt veckorna 28 tom 32. \nVälkomna!"
  },
  {
      business_name: "Eriksons Chark",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/w0hjl42q7s7fih9.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/97zmbj58dycvwqx.jpeg",
      latitude: "58.18867436274337",
      longitude: "12.720963611555817",
      description: "Välkommen till Eriksons Chark!\n\nPå Eriksons Chark köper du delikatesser som arbetats fram under mer än 90 år av 4 generationer. Fler av recepten är äldre än företaget självt. \nAlltihop började med Johan Erikson som 1923 startade Eriksons Chark. \nVarje söndag satte sig Johan på cykeln och åkte gårdarna runt för att se ut de finaste kor, kalvar och grisar. \nEfter att noga ha uppskattat vikt och värde avgjordes affären med ett handslag och en sup. \nPå måndagar var slaktdagen då bönderna kom med sina djur till Eriksons slakteri som låg precis bredvid järnvägen.\nJohan och hans hustru Magda fick sönerna Harry och Ingemar och dottern Inga-Lisa vilka tidigt fick börja hjälpa till. \nHarry smet ibland hem från skolan för att hjälpa till. Harry och Ingemar lärde av sin far och 1948 arrenderade Johan ut charkuteriet på Storgatan till Harry och behöll själv slakteriet. \nNär Johan gick bort 1974 övertog Harry även slakteriet och drev rörelsen vidare tillsammans med sin hustru Kerstin. \nFöretaget moderniserades och utvecklades enligt tidens krav. \nÄven Harry och Kerstins barn Rolf och Eva kom tidigt in i företaget. Rolf lärde sig till charkuterist av sin far och arbetade länge vid hans sida. \nNär Harry hastigt gick bort 1990 tog Rolf och Eva över rörelsen. \nDe fortsatte att satsa framåt och 1995 stod den nu utbyggda fabriken klar och med hjälp av Rolfs fru Lisbeth drevs den fram till 2015, då nästa generationsskifte inträffade.\n\nSen årsskiftet 15\/16 driver nu Rolfs barn Cecilia, Gustav och Linus företaget vidare tillsammans med Eva. \nRolf och Lisbeth finns fortfarande kvar i företaget och här hittar vi fler familjemedlemmar så som Gustavs fru Ann och Evas dotter My. \nSå Eriksons Chark är i sann mening ett äkta familjeföretag med ett 20-tal anställda utöver familjen. \n\nCharktillverkningen sker idag i moderna lokaler på samma plats där det började för nästan ett sekel sedan. \nI butiken sker försäljning av kött- & charkvaror samt ost och andra delikatesser.\nEriksons Chark har fortsatt att ta fram nya recept och varianter på charkvaror men håller fast vid tradition och kvalitet och endast svenska köttråvaror.\n\nDeras varor finns i ett 40-tal butiker runt om i Västra Sverige samt i den egna butiken i Nossebro där du är välkommen att inhandla kött och välja bland alla deras egna delikatesser! \n\nÖppettider i butiken:\nOnsdag 11-18  –  Torsdag 9-18  –  Fredag 9-18\n"
  },
  {
      business_name: "Grimsis AB",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/8gemki6rw3corc5.gif",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/tlr3whqik7ini8e.jpg",
      latitude: "57.6626788",
      longitude: "12.554063400000018",
      description: "Grimsis AB är ett familjeföretag som består av Kristina Andersson och Tryggvi Leifur Óttarsson, numera bosatta i Bollebygd. Tryggvi är islänning och Kristina har bott på Island 1996-2008. Barnen Ida och Linnea Tryggvadóttir är födda på Island och familjen bodde i Ólafsvík på Snæfellsnes, som ligger ca 20 mil nordväst om Reykjavik.  Tryggvi har arbetat som VD för Islands största fiskeauktion, Fiskmarkaður Íslands, i 16 år och har mycket goda kontakter på Island och känner väl till den isländska fiskenäringen.\nGrimsis säljer isländsk, färskfryst fisk av högsta kvalitet,  alltid filéad och fryst på Island. \n\nFörutom fisken erbjuder Grimsis även isländskt lammkött som kommer från Fjallalamb på norra Island. Lammen går fritt ute på de isländska fjällen hela sommaren och äter gräs, frökapslar och vilda kryddor. \n————————————————-\nÖppet torsdagar kl 10 – 18 + sista lördagen \/ månad kl 11 -14.\nI Grimsis butik hittar ni fisk, lammkött och godis från Island. Här finns även goda fiskkryddor och ägg från Sammels Gård i Landvetter,\nHjärtligt välkomna till Grimsis på Rinnavägen 10 i Bollebygd \n"
  },
  {
      business_name: "Gröna gårdar",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/6mvl4w5omdzp7jp.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/7ntflkr50rzh59w.jpg",
      latitude: "58.28167559999999",
      longitude: "11.641583800000035",
      description: "Gröna gårdar samverkar med ett 40-tal av de bästa uppfödarna runt om i Västsverige, från Halmstad i söder till Karlstad i norr.\n\nGemensamt för alla gårdar är att, utöver KRAV:s regler, även följa Gröna gårdars egna kriterier för uppfödning, varav det främsta är att djuren äter artriktig föda, det vill säga gräs och örter.\nEftersom våra djur växer upp långsamt på naturlig föda hinner köttet utveckla en rik och fyllig smak, samtidigt som det blir välmarmorerat och därför naturligt mört.\n\nVi vårt kött som köttboxar via vår webbshop (gronagardar.se) samt styckvis i ett antal utvalda butiker runtom i Västsverige."
  },
  {
      business_name: "Gunnagårds Naturprodukter",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/te85ru6yccuui32.png",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/0j5ml8s5ir28x4r.jpg",
      latitude: "57.58093129999999",
      longitude: "12.356905299999994",
      description: "Vi driver sedan 1981 en ekologisk mjölkgård med ca 60 kor samt rekrytering. Vi odlar även potatis och grönsaker ca 1 ha för lokal avsalu\noch i  gårdsbutik under säsong.  I gårdsbutiken finns också vårt eget frysta nötkött och egenproducerad ostkaka m.m. Se hemsidan för öppettider. "
  },
  {
      business_name: "Orust Shellfish AB",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/0e82lhvdc4xtgx2.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/7buisy961ek7phh.jpg",
      latitude: "58.1459975",
      longitude: "11.826731800000061",
      description: ""
  },
  {
      business_name: "Qvänum Mat & Malt AB",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/m8f6urjy8hsyfe3.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/0qi8cc5zat5fp1z.jpg",
      latitude: "58.2875161",
      longitude: "13.158550699999978",
      description: "Qvänum Mat & Malt är bryggeriet och bränneriet som huserar i ladugården på Gategården, mitt på Varaslätten. \nVi både brygger och bränner med maten i fokus! Vår passion för god mat och dryck har följt med oss in i bryggeriet och bränneriet.\nHär tillverkas öl och brännvin på ett hantverksmässigt och hållbart sätt med inriktning på lokala råvaror och största delen är ekologiskt.\n Några tillsatser använder vi inte och vattnet är från vår egen brunn.  All el kommer från sol-, vind- och vattenkraft. Bryggeriet och destilleriet värms upp med biobränsle."
  },
  {
      business_name: "Skeby Energi AB",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/e8vpvc8hycb74xc.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/r8do3ub5eezsdr3.jpg",
      latitude: "58.49614080118837",
      longitude: "13.307811029394543",
      description: "I mitten av 1970 talet hade Skeby haft några riktiga torrsomrar med dåliga skördar som följd.Man beslöt då gemensamt i bygden att satsa på ett bevattningsföretag som skulle ta vatten ur Vänern för att bevattna sina vallar och spannmålsodlingar. HB Skeby Vatten var fött.Projektet påbörjades 1976 och stod klart till odlingssäsongen 1977. De 17 delägarna hade då satsat 1.600.000 kronor i pumpstation, ledningar och bevattningsmaskiner.\nTack vare den nu säkrade tillgången på vatten började man prova på grönsaks och potatisodling, den lokala livsmedelsindustrin, Dafgårds, behövde bl.a. vitkål till sin tillverkning av kåldolmar. Maskinsamarbeten etablerades allt mer.Djuren försvann på en del håll, men tack vare att de ersattes med grönsaksodlingar, ofta med lagring och leverans över hela året, behölls arbetstillfällen, och gårdarna kom inte att slås ihop i så stor omfattning som på många andra håll.\nI mitten av 1990 talet var pumputrustningen sliten och en större renovering och modernisering genomfördes. Nu var delägarna 14 stycken.\nRunt 2000 började man fundera på vindkraft. Det skulle kännas bra att kunna producera lika mycket energi som man förbrukade i bevattningsföretaget. Skeby Vind AB såg dagens ljus, med 13 aktieägareEfter mycket prutande och en egenhändigt schaktad väg och byggplats restes Skeby 1 i oktober 2002 till en kostnad av 6 miljoner kronor.Det andra verket som stod på plats i juli 2003 kostade också 6 miljoner medan marknadskrafterna såg till att det tredje som var klart 2005 gick på drygt 8 miljoner. Nu producerade man betydligt mer el än vad både bevattningarna och gårdarna förbrukade.\n2005 var energi än mer i ropet och åtta grannar beslöt sig för att pröva lyckan. Bolagets namn blev Skeby Energi AB. Första året blev man Sveriges största hampaodlare för att andra året bli Sveriges minsta, bl. a. för att man kommit in på RME tillverkning. Tanken är att odla och köpa in raps lokalt, pressa ur oljan och processa den till biodiesel för den lokala marknaden.\nRestprodukten rapskaka ersätter importerad soja till bl.a. mjölkkor och grisar eller används i fastbränslepannor. Man är även livsmedelsgodkända och levererar kallpressad rapsolja till främst grossister och större förbrukare. Hittills har ca 5 miljoner kronor investerats.\n\n Alla delägarna är lantbrukare, man föder upp slaktkycklingar, köttdjur, grisar och hästar, grönsaker, spannmål, potatis, kör i skogen, har maskinstationer, sysslar med Farmartjänst m.m. Tack vare satsningen på vattnet för trettio år sedan har bygden utvecklats och möjligheterna som alltid finns har kunnat tas till vara."
  },
  {
      business_name: "Skenstaboa Gårdsbutik",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/zqqy4gsxrswodu0.png",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/u0ciz6hiq95jjw2.jpg",
      latitude: "57.69872489999999",
      longitude: "13.15650340000002",
      description: "Välkommen till Skenstaboa gårdsbutik i Dalsjöfors. \nHär hittar du bla. närproducerat och mat från andra gårdsbutiker runt om i Sverige. Vi gör presentkorgar och packar 7-häradslådan hos oss. På sommaren har vi självplockning av jordgubbar och vi milar grillkol från egen skog. Vi odlar egna julgranar, både vanliga granar och kungsgranar\n\nÖppet torsdagar kl.14-19 & lördagar kl.10-13, året om! \nExtra-öppet i december och i samband med jordgubbsplockningen! Se www.skenstaboa.se eller facebook för mer info!\n\nVarmt Välkomna! "
  },
  {
      business_name: "Sommarhagens gårdsmejeri",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/ammj7islftlacgh.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/owry4saqdjui1hu.jpg",
      latitude: "57.89203369999999",
      longitude: "12.159498299999996",
      description: "Sommarhagens Ost är beläget i de djupa skogarna i Ale, bara 3 mil norr om Göteborg. Här produceras krämiga dessertostar såväl som långlagrade hårdostar. Vi låter enzymer och mikrober utföra sina jobb i deras eget tempo och denna långsamma mognadsprocess ger väl utvecklade smaker utan onödiga tillsatser. Alla ostar av komjölk ystas på KRAV-certifierad mjölk som hämtas direkt vid mjölkningen från en bonde i grannbyn.\nI november 2018 blev vår grönmögelost Kaxige Kal belönad med ett silver i World Cheese Award (ost-vm)."
  },
  {
      business_name: "Söråsen",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/fq3y7mhjj4c86j3.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/dfe4vdimqbz2js4.jpg",
      latitude: "58.7115648",
      longitude: "14.080268400000023",
      description: "Småskalig grönsaksodling i Töreboda med fokus på Chili och Mathantverk.\nVi odlar i möjligaste mån allt till vårat mathantverk dvs många olika sorters chili, men även annat både vanligt och ovanligt.\nExempel på produkter: olika chutneys (2 har tagit silver i mathanverks-SM), torkad och mald chili,  Samba&Lek,  Sriracha (brons i mathantverks-SM 2017), Forest Flames, Tropical Heat, Marmelader (grön tomat marmelad silver mathantverks-SM 2017), Honung, chili-honung och Buffalo Gurka.\nAllt är i liten skala och produktutveckling pågår ständigt.\n"
  },
  {
      business_name: "The Green Bakery AB",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/wbmittb4ip8shcq.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/yr9wwxh19u2bi5u.jpg",
      latitude: "57.7784121",
      longitude: "12.050701900000035",
      description: "Green Bakery är ett hantverksbageri som är helt inriktat på ekologisk produktion. Vi använder enbart de bästa av råvaror och bakar enligt gamla traditioner.\nVi är certifierade enligt IP Livsmedel samt för KRAV- och EU-Ekologisk produktion.\n\nBröden vi bakar, bakas för hand. På så sätt medverkar vi till att hålla en månghundraårig hantverkstradition vid liv. Vår målsättning är att sälja våra bröd genom samtliga aktörer på livsmedelsmarknaden – samt till distributörer som levererar bröd till kommuner och landsting.\n\nVi vill medverka till att slå hål på myten att ekologiska livsmedel är dyra och har dålig hållbarhet. Det gör vi enklast genom att se till att så många som möjligt kan köpa och äta våra produkter! \n \nVill du köpa riktigt gott bröd och samtidigt bidra till en bättre miljö?\nDå är du välkommen till någon av de butiker där våra produkter finns idag!\nOm du saknar vårt bröd i ”din” livsmedelsbutik, får du påpeka detta för butiken. \n\nVälkomna!"
  },
  {
      business_name: "ÖstraGärde Gård",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/hfok6bdk49tm2nt.png",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/ud6y329apokfmsz.jpg",
      latitude: "57.553034",
      longitude: "12.435497400000031",
      description: "Champinjoneri i Världsklass!\nPå Östragärde Gård i Sätila odlar vi champinjoner och ett brett sortiment exotisk svamp. Vi har även ett förädlat sortiment som bla består av champinjonsoja, torkade och rökta champinjoner. Vi levererar nyplockad svamp flera dagar i veckan direkt till butiker och restauranger. Vi erbjuder idag allt från den mustiga shiitaken till torkade och rökta champinjoner. Vi är certifierade inom IP Livsmedel och anslutna till KRAV!\nVälkommen till världens bästa Champinjoneri!"
  },
  {
      business_name: "Tavlebord Lanthandel",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/xpm6kc32g11qnxt.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/df3pa6k16bfrt86.jpg",
      latitude: "58.14854510000001",
      longitude: "11.58391729999994",
      description: "Saluhall och kafé i genuin lanthandelsmiljö i Tegneby mitt på Orust. Saluhallen fungerar som en marknadsplats för lokala producenter av livsmedel och hantverk. Kafét sköts av lokala föreningar, organisationer och skolklasser.\nÖppet: lördagar kl 10-14. För avvikelser och extradagar se www.tavlebord.se eller följ oss på Facebook. Säsongsstängt v. 52 t.o.m. feb."
  },
  {
      business_name: "Dalslandsstruts",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/y6fikqp2m56ku3c.jpeg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/otv8e3o5b6t8skn.jpeg",
      latitude: "58.602977744681034",
      longitude: "11.968037892065468",
      description: "Glumserud Gård har uppfödning av Struts, Lamm o frigående utegrisar. Vi har lite djur av var sort. På vår gård finns en liten gårdsbutik där vi säljer vårt kött och lite andra produkter. Dalslands Struts är vårt namn för våra strutsar, Dalslamm Dorper för våra får o lamm, av rasen dorper samt korsningar. "
  },
  {
      business_name: "Adelsåsens Kalkon",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/knz8c6cgmbgpbmf.png",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/8jpydh9dbcub6nn.jpeg",
      latitude: "58.3294519",
      longitude: "12.93325619999996",
      description: "Kalkonspecialisten med koll på hela kedjan. I över 50 år har det funnits kalkoner på Adelsåsen. Tre generationer är nu verksamma i vårt familjeföretag. Med de erfarenheter vi har fått under dessa år producerar vi kalkoner på ett sätt som ger Dig som konsument den allra bästa kvalité. Vi har egna avelsdjur och eget kläckeri, egen uppfödning, eget småskaligt kontrollslakteri, egen vidareförädling och egen gårdsbutik. I sortimentet finns idag ett 40-tal olika kalkonprodukter – skinkor, korvar, färs och grillat, men också färdiga alternativ såsom hamburgare och prisbelönta köttbullar som dessutom är fria från gluten, laktos och ägg. Du hittar oss mellan Lidköping och Vara i Stora Levene. En ort på den vackra, grönskande Varaslätten."
  },
  {
      business_name: "Kullans Lycka",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/f2sf93ctvmd9mn7.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/91jnna01kzojz7y.jpg",
      latitude: "58.4821523",
      longitude: "12.974978400000055",
      description: "Det är våra fantastiska får som bildar navet i Kullans Lycka. Lokalt kött, charkuterivaror och fårskinn från djur som är uppväxta på kärlek och omsorg. \nHos oss handlar det om att ta vara på naturens vackra och goda, varje dag."
  },
  {
      business_name: "Alboga Choklad",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/7nstm6d7yvyl3va.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/9t2bzay9claikqg.jpg",
      latitude: "57.97479824061916",
      longitude: "13.229996146785765",
      description: "Handgjorda Praliner, Fudge, Kolor, Tårtor och andra bakverk tillverkade av Närproducerade och Kretsloppsorienterade råvaror så långt det går.  Vi använder inga tillsatser, aromer eller färgämnen utan använder oss bara av rena och naturliga smaker och färger. Besök vår natursköna butik i Alboga som vi har tillsammans med Blommor och Jord. Här kan ni strosa runt bland blommorna i växthuset, äta choklad, kolor och glass eller bara njuta av vår vackra miljö. Vi tar även emot beställningar av Tårtor och Smörgåstårtor för alla tillfällen , stort som smått."
  },
  {
      business_name: "DalsSpira Mejeri AB",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/7efwupzqio42s6z.png",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/az1ypnii3gtvbzr.jpg",
      latitude: "58.68794447174173",
      longitude: "11.989155707470672",
      description: "Dalsspira mejeri erbjuder lokalproducerade komjölksprodukter, från hjärtat av Dalsland, med god smak och unika egenskaper. Med Dalsspiras produkter kan alla konsumenter göra ett val som känns bra i magen. Dalsspira mejeri värnar om djur, människor och landskap.\n\n "
  },
  {
      business_name: "Honungshuset",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/37y4xju5cku7ae8.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/0ca8qk3wi0uu8y2.jpg",
      latitude: "58.55379833228171",
      longitude: "13.774987127578026",
      description: "Kristina och Mias biodlingsföretag i Böja. Vi hanterar alla led i processen själva, från kupa till burk.  Våra bigårdar är placerade så att bina har olika nektardrag. Vanligast är nektar från maskros, oljeväxter, vitklöver, hallon, åkerböna och fruktträd vilket ger honung med olika karaktär.  2014 certifierade vi biodlingen enligt Svenskt Sigill, vilket borgar för svenska produkter, producerade med djuromsorg och miljötänk m.m. All hantering av honungen utförs av oss, på ett varsamt sätt för att säkerställa en kvalitetsprodukt. Vi har honung till försäljning under hela året. Nyslungad honung kan du köpa i början av juni till september. Välkomna!"
  },
  {
      business_name: "Engalycka gård",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/9umum076cozo05r.png",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/qfd12rijckx9r75.jpg",
      latitude: "57.6256241",
      longitude: "12.484164400000054",
      description: "Trevlig rustik och lantlig gårdsbutik med kafé som serverar hembakat och goda smörgåsar. Vi har fina saker till hem och som present. Vi säljer även närproducerat lammkött och ägg i mån av tillgång. Söker du efter fina lammskinn har vi det också, både klippta och oklippta."
  },
  {
      business_name: "Ahlafors bryggeri",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/akd9eogtm1d9v7h.png",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/3v62dctqxclu3qv.jpg",
      latitude: "57.92508780000001",
      longitude: "12.100055099999963",
      description: "Ahlafors är ett av sveriges äldsta mikrobryggerier, med tillverkning av folköl, starköl och cider i flertalet stilar. Våra drycker säljs i dagligvaruhandeln, på systembolag samt restauranger och krogar i västsverige."
  },
  {
      business_name: "Dalis gård",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/cbrizo5iy2ebnc7.png",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/bov36hz08rlog0n.jpg",
      latitude: "57.816667",
      longitude: "11.833333000000039",
      description: "Dalis Gård ligger i södra Bohuslän och vi föder upp lamm och tillverkar delikatesser. Lammkött  och korv säljs på hösten och skinn och sydda produkter av lammskinnsäljs hela året. Lammen är uppfödda på vår egen gård. Slakt och styckning sker på Ljungkile gårdsslakteri, där behandlas djuren på ett lugnt och värdigt sätt och köttet hängmöras för att uppnå bästa smaklighet. Möt oss på www.dalis.se, Facebook: Dalis Gård och Instagram: @dalisgard Välkommen!"
  },
  {
      business_name: "Lantligt Anno 1785",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/xalhgxmxst6rx70.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/ihcg5feibkrla61.jpg",
      latitude: "58.63849832855731",
      longitude: "14.230343824999977",
      description: "Vid foten av Kroppefjäll hittar ni vårt mysiga Café, med en underbar veranda att sitta på! Vi har flera olika smörgåsar, våfflor och goa kakor allt hembakat! I Gårdsbutiken säljer vi vårat eget ekologiska nötkött både till grillen och goda grytor, och mycket annat gott! Kungarummen i stora huset visas efter överenskommelse.  Öppettider hittar ni på FB under namnet Ekholmen Cafe & Gårdsbutik! Hoppas vi ses!"
  },
  {
      business_name: "Naturbruket i Änga",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/0jn9ar9yp5aiog5.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/e75qfjzl9zbnjij.jpg",
      latitude: "57.8189323",
      longitude: "13.254940099999999",
      description: "Jag och min man har ett litet lantbruk i Änga utanför Hökerum i Ulricehamns kommun och odlar Krav-godkända grönsaker med hjälp av småskaliga metoder och nordsvenska hästkrafter.  \nVi strävar efter att tillämpa principen organisk biologisk odling, naturliga och kretsloppsanpassade odlingsmetoder som täckodling, skonsam markbearbetning, samodling och gröngödsling. Med dessa metoder minskas behovet av gödning och vattning, jorden får en naturlig sammansättning som gynnar mikrolivet i jorden, nyttoinsekter och ger ett bra näringsinnehåll i grönsakerna.  \nVi har också Gotlandsfår som betar på våra ängar tillsammans med hästarna för att hålla markerna öppna. \nDen Nordsvenska hästen är en gammal svensk arbetshäst som idag riskerar utrotning då det föds allt för få föl.  Den kulturhistoriskt värdefulla nordsvenska rasen är otroligt mångsidig och värdefull i ett småbruk. Hästen används till mycket på gården, allt från att harva och radhacka bland grönsakerna till att hämta virke i betesmarker och skog. Ibland åker finvagnen fram eller sadeln på för en tur i den vackra omgivningen. \nVi säljer grönsaker och lammkött till restaurang, catering och via REKO-ringar i närheten samt vid förfrågan på gården.\nVi har även entreprenad inom trädgård och grönyteskötsel i samarbete med Farmartjänst Ulricehamn samt utför skogsröjning och vedkörning med Nordsvensk brukshäst. \n\n"
  },
  {
      business_name: "Aktiebolaget GBG Soda",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/zxq86px9vc2hfxh.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/8hp8fqr4o1e59p0.jpg",
      latitude: "57.6516428",
      longitude: "12.160869899999966",
      description: "Vi mikrobrygger alkoholfria drycker som inte är söta.  Olika former av soda (Ginger ale, Black Currant, Kombucha Sour, India Pale Soda Mango, Rosemary\/Orange, Raspberry wheat beer mm) samt alkoholfri öl.                          \n\n\n"
  },
  {
      business_name: "Agnetas Odlingar & Konst",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/6mzp196rpoerz0p.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/s4sxdx765v9iuhh.jpg",
      latitude: "58.20195699999999",
      longitude: "11.73289879999993",
      description: "En dröm förverkligades när jag för några år sedan bestämde mig för att skapa en fruktträdgård. Målet är att  skapa en ekologisk odling med biologisk mångfald för att gynna insekter och nyttodjur. Därför  bestämde jag mig för att plantera en skyddshäck som bestod av ätbara buskar och träd. Förutom äpple och päron har vi bl.a Saskaton (en blåbärsbuske med söta bär), blåbärstry, havtorn, storfruktig hassel och äkta valnötsträd. \n\nSom utbildad hushållslärare har jag också ett stort intresse av förädling. Frukt, bär, nötter och lite grönsaker (främst syrad gurka ) säljs färska och förädlade till privatpersoner och restauranger i södra Bohuslän. Vi vill öka tillgången på närproducerad  mat och erbjuda livsmedel som är odlad i harmoni med naturen , för bästa smakupplevelse.\n\nNYTT för 2019 är KOMBUCHA med smak av gårdens frukt och bär.\n"
  },
  {
      business_name: "Krokens lammgård",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/aq3qzv97x4xpu9c.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/wsucwpeppkiy10e.jpg",
      latitude: "57.8885399",
      longitude: "11.721080000000029",
      description: "Krokens gård ligger ute vid havet i Tjuvkil. Vi  har ca. 30 tackor  som lammar under mars – april.\nUnder sommaren går dom och  betar på våra natursköna  strandängar samtidigt som dom håller dom \nöppna.\nVi säljer lammlådor men de går också att komma  och köpa enstaka bitar. Vi säljer också korv och lammskinn.\nDe går också att köpa via REKOringen i Kungälv. Dit vi åker varan onsdag om de finns beställningar."
  },
  {
      business_name: "Limmareds Säteri",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/pcmowvwwtv52p0g.png",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/qppnu2vy6noj20w.jpg",
      latitude: "57.523466",
      longitude: "13.336632",
      description: "Hos oss kan man köpa kött från nöt och gris som är uppfödda på gården. Vid säsong kan du även plocka majs och svarta vinbär. \nVi har en butik som är öppen året runt \n\ntorsdagar och fredagar 14-18,lördagar 9-13.\nI butiken kan man förutom att köpa kött handla andra lokalproducerade produkter och islandsfisk. Det finns även kläder m.m. När det är majssäsong har vi utökade öppettider.\n\n\nLimmareds säteri ligger utmed riksväg 27 mellan Borås och Växjö, ca 3,5 mil söder om Borås.\n\nVälkomna!\n "
  },
  {
      business_name: "Falbygdens osteria AB",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/3kh7kjqbgbw8vv1.png",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/jej1myfvifrjbz6.jpg",
      latitude: "58.16688489999999",
      longitude: "13.53422839999996",
      description: "Ostparadiset i Falköping : Ostbutik , ostlager, restaurang och presentbutik med anor från 1878.  Ostbutiken har fler än 150 sorters ost och troligen Sveriges längsta ostdisk som är på hela 25 meter. Falbygdens Osteria är helt enkelt en ostupplevelse värd en omväg. Är Ni minst 10 personer och är intresserade av en ostupplevelse med ostprovning ring 0515-717231 eller 0515717234 så berättar vi mer. \n "
  },
  {
      business_name: "Knaltens Ekologiska Grönsaker",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/rdepd6i03w4n366.png",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/r96vvcg9fn33pac.jpg",
      latitude: "57.87745773849036",
      longitude: "13.327076212552015",
      description: "En del drömmer om att flytta till Frankrike, om att bo vid Medelhavet eller skaffa en gård på landet. Vi gjorde tvärt om, vi lämnade alla våra goda ostar och viner för att odla grönsaker på era fina svenska åkrar. \nNi hittar oss å vår gård i Hökerum nära Ulricehamn. I våra 14 tegar odlar vi ett sortiment av ca 40 olika ekologiska grönsaker. Vi gör det mesta av arbetet manuellt. För att underlätta detta arbete använder vi ett magiskt redskap: Bredgrepen. Grönsaksodlingarna är både ekologiska- och KRAV-certifierade (HS Certifiering AB, SE-EKO-04) och omfattar ca en halv hektar mark.\nVi säljer våra grönsaker hemma hos oss på gårdsbutiken varje onsdag kl 16 till 19, för den lokala marknaden i Ulricehamn, reko-ringar i Ulricehamn och Borås, samt några lokal butiker och restauranger. \nUnder säsongen har du möjlighet att njuta av våra nyskördade, näringsrika och mycket smakfulla grönsaker varje vecka.\n\nVårt motto är närodlat, nyskördat och smakrikt!"
  },
  {
      business_name: "Mariannes biodling",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/uxmao9guiwwif2k.png",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/rd4nteviel5yp9v.jpg",
      latitude: "58.58817766994984",
      longitude: "12.385916836523393",
      description: "Dalsländskt lantbruk som bland annat producerar jättegod ekologisk vitklöverhonung och en mycket fin ekologisk kallpressad rapsolja. Företaget drivs av Marianne Westman med familj.\nBåde biodlingen och växtodlingen är certifierad enligt KRAV.\n\nHonungen domineras ofta av vitklövernektar då vi har egen vitklöverfröodling. Detta ger en ljuvligt välsmakande, mild och len honung. Vi hanterar honungen varsamt och värmer aldrig upp den. Rapsoljan produceras av rapsfrö från vår egen ekologiska odling. Det är en mild kallpressad olja med nötig karaktär och smörig, blommig smak."
  },
  {
      business_name: "Yxsjöns Humlegård",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/ai2ok6jtwre56o9.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/oeu2xfvn7tzym2l.jpg",
      latitude: "57.64218899999999",
      longitude: "12.171224400000028",
      description: ""
  },
  {
      business_name: "Bossgårdens Grönsaker",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/90ygod4pqwuf0b2.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/j32mpkuf5oszibz.jpg",
      latitude: "58.1319939",
      longitude: "13.74156400000004",
      description: "På Bossgården odlar vi ett 50-tal sorters ekologiska grönsaker för skörd under en lång säsong från april och till efter nyår. Vi odlar småskaligt och med metoder som är varsamma med jorden. Förutom grönsaker har vi också höns, får och stutar. Vi (Jonas och Sanna) jobbar heltid på gården och vi har också hjälp av säsongsanställda. Vi brinner för ekologisk odling och lokal mat producerad med omsorg om människor och miljö."
  },
  {
      business_name: "Rydins Bigårdar",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/955ox4iaoktk0k8.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/25l78etq2yf67pu.jpg",
      latitude: "57.7845638",
      longitude: "13.428271699999982",
      description: "Rydins Bigårdar erbjuder honung från Ulricehamnområdet. Vår honung är fri från tillsatser och den är inte uppvärmd.  Vi säljer endast honung från egna bigårdar och märker alla burkar med sigill som berättar från vilket av våra bigårdsområden honungen kommer. Vi vill lyfta fram honungens naturliga variationer vilket är direkt kopplat till växtlighet, årstid och väderförhållanden. Vårt engagemang finns i arbetet tillsammans med bina, i mötet med människor och skapandet av ökad förståelse för de ekosystem vi är del av. "
  },
  {
      business_name: "Hotell Dahlia",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/xygfg4epzgt0xb2.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/el42ujf3zz6mdp5.jpg",
      latitude: "57.70661750000001",
      longitude: "11.771791099999973",
      description: "Ett gott samarbete och en slump skapade Dahlia växthotell och mathantverk, eller Hotell Dahlia, som det vanligen kallas.\n\nTatiana, Hotell Dahlias ena delägare, behövde ett ställe att förvara sina dahliaknölar i över vintern. Helena, den andra delägaren, hade just byggt ett orangeri som kunde hålla frostfri temperatur hela året. Ett växthotell såg dagens ljus.\n\nHotell Dahlias marmelad kom till av att Helena, som odlat chili i närmare 30 år, inte visste vad hon skulle göra med all frukt. – Koka marmelad! föreslog en vän. Och så blev det. Chilimarmeladen blev riktigt god och sålde väl. Helena och Tatiana fick blodad tand och har sedan dess gått kurser i mathantverk, smakat, låtit vänner smaka, och hållit utkik efter vad folk vill ha. Marmeladerna säljs i utvalda gårds-, ost- och delikatessbutiker från Uddevalla i norr till Halmstad i söder. \n\nMarmeladerna kokas för hand i verksamhetens restaurangkök i Lerum, av råvaror som i möjligaste mån kommer från närområdet – det vill säga egna trädgårdar, snälla grannar, och andra välvilliga själar.\n"
  },
  {
      business_name: "Ödsmåls Örtagård",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/7bu2dalqzh8tyg7.png",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/kpx5xirdufpf70b.jpg",
      latitude: "58.55301339999999",
      longitude: "11.32304350000004",
      description: "Här odlar vi bär, örter, vindruvor och grönsaker som sen förädlas till unika produkter.\nMed smak, kvalitet och identitet som man i storproduktion har svårt att ta fram.\nVi avänder även råvaror från privata trädgårdar i närområdet. När vi ”importerar” råvaror,\nanvänder vi ekologiskt odlat så långt som möjligt och ursprungsmärkt.\nGenom vårt småskaliga mathantverk, utvecklar vi både traditionella och lite ovanliga produkter. \nVi komponerar och producerar allt ifrån sylt och marmelader till glöggar och smaksatta oljor.\nAllt tillverkas helt hantverksmässigt och med stor varsamhet."
  },
  {
      business_name: "Smedseröd Odlaren",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/l1by0fim748palk.zip",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/2tqh6wycbfbsz04.jpg",
      latitude: "58.3860429",
      longitude: "11.825968200000034",
      description: "Smedseröd Odlaren är ett företag strax utanför Uddevalla. Erbjuder kvalitetsprodukter med utsökt smak och kvalite. Ingredienser från finaste råvaror.  Unik närproduktion från ”Småskalig livsmedelsförädlare” med kvalitetsprodukter enligt naturens villkor och egen tillverkning. Ett genuint mathantverk av högsta kvalitet – småskaligt alternativ till traditionellt utbud. Årstidsvis växtdekorationer och odlingar. Trädgårdstjänster.   REKO-RING och LOCAL FOOD NODES ORG. Levererar till restauranger och privatpersoner.  Besök hemsidan: www.smedserododlaren.se eller Instagram: smedserod_odlaren."
  },
  {
      business_name: "Widén Gården",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/u84qf2ylddcx552.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/utl9tlw1nluwykp.jpg",
      latitude: "58.71057519999999",
      longitude: "11.330993000000035",
      description: "Vi odlar främst havtorn och aroniabär som vi både säljer som de är, frysta eller som råsaft. Vi säljer även andra produkter i vår lilla gårdsbutik. Välkomna att boka tid. Återförsäljare sökes också för våra produkter av Nordic Crown som vi är grundare till.  "
  },
  {
      business_name: "Lottas Bak & Form",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/78fmoptql4x0psq.pdf",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/p9d20x12mps60pu.jpg",
      latitude: "57.94916391569582",
      longitude: "11.567175613657014",
      description: "Surdegsbageri och kafé som varit igång sedan 2009. Bakar med enbart kultursorter från små kvarnar. Ekologiska kravmärkta råvaror. Har gårdsförsäljning av lokalt mathantverk och mjölsorter. Surdegsbröd i många varianter och en hel del bakverk. Kafe och lättare lunch. Öppet året runt. Se vår hemsida för öppettider. Bageriet ligger alldeles vid vattnet i Bleket, södra Tjörn. Kafé med både inne och uteservering.\n"
  },
  {
      business_name: "Hulatorps Champinjoner",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/v1w85601sgire1n.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/laew9l8fw7a9c4s.jpg",
      latitude: "57.439651398473714",
      longitude: "12.545889315344198",
      description: "Hulatorps Champinioner \n\nAllting började med att Liselott Johnsson för många år sedan fick upp ett stort intresse för svampodling. Ett fritidsintresse som allt eftersom tiden gick började ta upp allt mer tid och slutligen förstod Liselott att det var det här var någonting hon ville ägna mer tid åt. \nI dag tillbringar hon många timmar i svampladan där svampen plockas med omsorg. Minsta lilla fläck och svampstackarn åker i skamhinken. Det krävs därför noggrannhet med hela processen. Allt från vattning, luftfuktighet och att se till att svamparna inte står för tätt, till packning och leverans till butikerna.Men det är just så man kan odla fram de finaste svamparna."
  },
  {
      business_name: "Östängs Gård",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/byqfdfg54n6yse8.png",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/jg9uile3601qui5.png",
      latitude: "58.08755861777656",
      longitude: "12.631058796565412",
      description: "Vi producerar bra livsmedel för närområdet. Grönsaker som odlas utan konstgödsel eller bekämpningsmedel i fasta bäddar utan grävning. Vi värnar om mikrolivet och jorden och gör allt jobb för hand. Vi producerar också väldigt goda ägg från hönor som bor i husvagn och går i stora hägn under äppelträden. Eftersom de är ute i solen och äter gräs så är äggulorna mörka i färgen. Vi producerar också honung, äpplen och bär. Vår gårdsbutik är öppen varje fredag 15-18 men ägg kan man köpa när som helst i vår självbetjäningsbutik på gårdsplanen. Vi säljer också våra produkter på REKO-ringen i Alingsås samt på Nolbygårds Matmarknad på lördagarna 10-14 från juli till och med oktober. Tillsammans med fem andra gårdar driver vi Alingsås mobila musteri som tar emot äpplen från privatpersoner. "
  },
  {
      business_name: "Hollanders Glass",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/1lopqntv6guk14a.png",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/v82h68si3krsz8s.jpg",
      latitude: "57.9222534",
      longitude: "12.520801300000016",
      description: "Lokalproducerad glass och gelato med råvaror från regionen. \nMin passion ligger i att ta fram äkta, ibland lite oväntade smaker från lokala råvaror. Jag känner en stolthet över mitt samarbete med lokala bönder, odlare och mathantverkare. Min glass innehåller oftast ekologiska råvaror men har ingen certifiering varför den inte klassas som ekologisk.\n\nGlassen säljs hos några lokala caféer, restauranger och återförsäljare med högt ställda krav.  Dessutom erbjuds dagsfärsk gelato, glass och sorbet på lilla Pop-Up Gelaterian i caféstaden Alingsås. Öppettiderna är begränsade. För aktuella öppettider besök hemsidan.  \n\n\nVälkomna!\nJoachim Hollander,  Glassmakare"
  },
  {
      business_name: "Bondfrun",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/57jjcypxgmsfvtr.jpeg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/oyj81aghndnwgnr.jpeg",
      latitude: "58.24171280195607",
      longitude: "13.074344507812498",
      description: ""
  },
  {
      business_name: "Bagare Brage",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/0w1vm3t1plgnn0z.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/z0av0u3ekvd8frm.jpg",
      latitude: "58.63849832855731",
      longitude: "14.230343824999977",
      description: "Servering\nI vår konditoriservering kan du avnjuta ett riktigt svenskt fika. En kopp kaffe, våra goda bullar, ett wienerbröd, lite småkakor eller en smaskig bakelse i lugn och ro.\nSitt en stund och jobba, surfa eller läs en bok medans du njuter av det gammaldags konditoriets läckerheter. Om du är lite hungrig kan du beställa någon av våra goda smörgåsar eller en sallad.\nVid fint väder kan du slå dig ned på vår härliga uteservering.\nVälkommen!"
  },
  {
      business_name: "Gyllene Biet",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/jhpofvt2mwynoml.png",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/vah30s8b9z890k1.jpg",
      latitude: "57.807613158678144",
      longitude: "12.441740757306889",
      description: "Gyllene Biet har sitt hjärta i Hemsjö i de södra delarna av Alingsås kommun. Jag har även bigårdar i Sävedalen och Skepplanda och kan på så vis erbjuda närproducerad honung med smak av flera olika platser.\nVarje bigård slungas för sig och vid flera tillfällen per säsong för att få fram så rena smaker som möjligt. Locksigillen anger vilken plats honungen kommer ifrån. Honungen är hanterad varsamt från bikupa till burk utan någon uppvärmning för att behålla smak och nyttigheter i så stor utsträckning som möjligt.\n\nSmaksatt honung finns med ingefära, eukalyptus, citron, kakao, mintchoklad och apelsinchoklad. Jag smaksätter också honung med propolis som är binas naturliga försvar mot virus och infektioner. \n\nUtöver honung erbjuder Gyllene Biet bivax till hudvårdsprodukter, salvkit, tass-salva,  bivax-folie och föreläsningar om biodling."
  },
  {
      business_name: "Quna Kombucha",
      logo_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/02nxj391lzlrm5c.jpg",
      cover_image_url: "https:\/\/lokalproducerativast.se\/wp-content\/uploads\/producers\/5jb29a5k7opr6wq.jpg",
      latitude: "57.68859035140304",
      longitude: "11.926117527111842",
      description: "Brygger kombucha. \nKombucha är en uråldrig dryck som västvärlden fått upp ögonen för då den är otroligt rik på probiotika, aminosyror och vitaminer - Dessutom SUPERGOD! \nVi strävar efter att bli 100% ekologiska. \nVi är livsmedelcertifierade."
  }
]

type Props = {};
type State = { region: ?Region, }

class SingleMapScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { navigation } = this.props;
    const lat_param = navigation.getParam('lat', '0.0');
    const long_param = navigation.getParam('long', '0.0');
    const name_parameter = navigation.getParam('name', "Producent AB")
    const latitude_parameter = parseFloat(lat_param);
    const longitude_parameter = parseFloat(long_param);

    this.state = { region: {
        latitude: latitude_parameter,
        longitude: longitude_parameter,
        name: name_parameter,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2
      }
    }
  }

  render() {
    const marker_image = require('./lpiv_pin_60_91.png');

    return (
      <View style={ styles.container }>
        <HideStatusBar />
        <MapView
          provider = { PROVIDER_GOOGLE }
          region = { this.state.region }
          style = { styles.mapViewContainer }
          >
          <MapView.Marker coordinate = {{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude
          }} image={marker_image}>
            <MapView.Callout>
              <View>
                <Text>{this.state.region.name}</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }
}

class MapScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { region: VÄSTRA_GÖTALAND };
  }

  renderMarkers() {
    const marker_image = require('./lpiv_pin_60_91.png');
    
    return producer_list.map((location, key) => {

      return (
          <MapView.Marker coordinate = {{
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude)
          }} key={key} image={marker_image}>
            <MapView.Callout onPress = {() => {
                  // Navigate to details route with parameter
                  this.props.navigation.navigate('Producer', {
                    itemId: 86,
                    otherParam: location.business_name,
                    desc: location.description,
                    image: location.logo_url,
                    cover: location.cover_image_url,
                    lat: location.latitude,
                    long: location.longitude,
                    direction: location.map_direction_link,
                    adress: location.visiting_adress,
                    name: location.business_name
                  });
                }} >
              <View>
                <Text>{location.business_name}</Text>
              </View>
            </MapView.Callout>
          </MapView.Marker>
      );
    })
  }

  render() {
    function success(p) {
      position = p;
    }

    function error(msg) {
      message = msg;
    }

    Geolocation.getCurrentPosition(success, error);

    return (
      <View style={ styles.container }>
        <HideStatusBar />
        <MapView
          provider={ PROVIDER_GOOGLE }
          region={ this.state.region }
          showsUserLocation={true}
          style={ styles.mapViewContainer }>

          {
            this.renderMarkers()
          }
          
        </MapView>
        <MenuScreen navigation={this.props.navigation} />
      </View>
    );
  }
}

class ProducerScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'Detaljskärm med parameter.',
      // These values are used instead of the shared configuration
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };  

  render() {
    const { navigation } = this.props;
    const description = navigation.getParam('desc', 'Ingen beskrivning');
    const logo_image = navigation.getParam('image', '404');
    const background = navigation.getParam('cover', '404');
    const latitude = navigation.getParam('lat', '58.2528');
    const longitude = navigation.getParam('long', '12.77');
    const producer_adress = navigation.getParam('adress', 'Kogatan 12 Timmersdala 15623');
    const contact_person = navigation.getParam('contact_person', 'Anders Svensson');
    const producer_city = navigation.getParam('producer_city', 'Tidaholm');
    const producer_email = navigation.getParam('producer_email', 'anders@gmail.com');
    const producer_phone = navigation.getParam('producer_phone', '0705727004');
    const producer_website = navigation.getParam('producer_website', 'https://www.example.com');
    const producer_name = navigation.getParam("name", "Producent AB");
    const opening_hours = navigation.getParam("opening_hours", "00:00 - 23:00 torsdag - lördag")

    return(
      <View>
        <ImageBackground source={{ uri: background }} style={{width: '100%', height: '100%'}}>
          <HideStatusBar />
          <ScrollView>
            <View style = {{ backgroundColor: 'rgba(255, 255, 255, 0.75)', padding: 20, marginLeft: 20, marginBottom: 20, marginRight: 20, marginTop: 5, borderRadius: 10, marginTop: 200 }}>
              <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                  <Image
                    source={ { uri: logo_image }}
                    style={{ width: 300, height: 100, flex: 1, resizeMode: 'contain' }}
                  />
                </View>
                <View style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  marginBottom: 15
                }}>
                  <Text style={{fontWeight: 'bold'}}>Om oss</Text>
                  <Text style={{marginBottom: 20, marginTop: 5}}>{description}</Text>
                </View>
                <View style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  marginBottom: 15,
                }}>
                  <Text style={{fontWeight: 'bold'}}>Kontaktuppfgifter</Text>
                  <Text style={{marginBottom: 2, marginTop: 2}}>Besöksadress: {producer_adress}</Text>
                  <Text style={{marginBottom: 2, marginTop: 2}}>Kontaktperson: {contact_person}</Text>
                  <Text style={{marginBottom: 2, marginTop: 2}}>Besöksort: {producer_city}</Text>
                  <Text style={{marginBottom: 2, marginTop: 2}}>E-post: {producer_email}</Text>
                  <Text style={{marginBottom: 2, marginTop: 2}}>Telefon: {producer_phone}</Text>
                  <Text style={{marginBottom: 17, marginTop: 2}}>Webbsida: {producer_website}</Text>
                </View>
                <View>
                  <Text style={{fontWeight: 'bold'}}>Öppettider</Text>
                  <Text style={{marginBottom: 20, marginTop: 5}}>{opening_hours}</Text>
                </View>
                <Button
                  backgroundColor='#37503c'
                  buttonStyle={{borderRadius: 5, marginLeft: 40, marginRight: 40, marginBottom: 0, marginTop: 20, backgroundColor: "#37503c"}}
                  title='Hitta oss på kartan'
                  onPress = {() => {
                    // Navigate to details route with parameter
                    this.props.navigation.navigate('Map', {
                      lat: latitude,
                      long: longitude,
                      adress: producer_adress,
                      name: producer_name
                    })}}
                  />
              </ScrollView>
            </View>
          </ScrollView>
        </ImageBackground>
      </View> 
    )
  }
}

class OverviewScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }

  componentDidMount() {
    var return_array = global.fetch('https://lokalproducerativast.se/wp-json/tivala/v1/producerlist', {
      method: 'get',
      headers: new global.Headers({
        'Authorization': 'Basic ' + Buffer.from('api_2jWTR5iTIHOOxdIVqV2HFLPDJ0aQOMydlSGNbdoneEXGcI39JNC9R2W:uf6He48ci0H92Y7E5T6dmKAGuOiGE0PGwBlp51drqFHYehQP9HKBftu').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: undefined
    })
    .then(response => response.json())
    .then(responseJson => {
      //console.log(responseJson);
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson,
        },
        function() {
          this.arrayholder = responseJson;
        }
      );
    })
    .catch(error => {
    });
    
    //console.log(return_array);

    return return_array;
  }

  search = text => {
    //console.log(text);
  };

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.business_name ? item.business_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    return(
      <View 
        style = {{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  renderItem = ({ item }) => (
    <ListItem
      Component = {TouchableScale}
      friction = {90}
      tension = {100}
      activeScale = {0.95}
      linearGradientProps = {{
        colors: ['#37503c', '#2b4330']
      }}
      ViewComponent = {LinearGradient}
      leftAvatar = {{ rounded: true, source: { uri: item.logo_url }, justifyContent: 'center' }}
      title={item.business_name}
      titleStyle = {{ color: 'white', fontWeight: 'bold' }}
      subtitle="LPIV, Matfest"
      subtitleStyle = {{ color: 'white' }}
      chevronColor="white"
      chevron
      containerStyle = {{ marginLeft: 5,
        marginRight: 5, 
        marginTop: 10, 
        borderRadius: 4, // adds the rounded corners
        backgroundColor: '#fff',
        height: 60,
        borderWidth: 1,
        borderColor: '#37503c'
      }}

      onPress = {() => {
        this.props.navigation.navigate('Producer', {
          itemId: 86,
          otherParam: item.business_name,
          desc: item.description,
          image: item.logo_url,
          cover: item.cover_image_url,
          lat: item.latitude,
          long: item.longitude,
          direction: item.map_direction_link,
          adress: item.visiting_adress,
          name: item.business_name
        });
      }} 
    />
  )

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.business_name ? item.business_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  render() {
    const viewStyles = [
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#827c34'
      },
      { backgroundColor: '#827c34' }
    ];

    const descriptionStyles = {
      color: '#282828',
      fontSize: 25,
      fontWeight: 'bold',
      padding:10
    };

    const store_type = this.props.navigation.dangerouslyGetParent().getParam("store_type");

    return(
      
      <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}} style={viewStyles}>
        <HideStatusBar />
        <View style={{marginTop: 30}}>
          <View style = {{justifyContent: 'center', alignItems: 'center', marginTop: 65}}>
            <Text style={descriptionStyles}>{store_type}</Text>
            <Text style={{ color: "#282828", fontSize: 10, fontStyle: "italic" }}>Sortera efter kategori...</Text>
          </View>
          <View>
            <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
              <Button
                color='#827C34'
                buttonStyle={{borderRadius: 5, width: 90, marginRight: 15, marginLeft:25, backgroundColor: "#37503c"}}
                title='Alla'
                onPress = {() => {
                  // Navigate to details route with parameter
                this.SearchFilterFunction("")}}
              />
              <Button
                backgroundColor='white'
                buttonStyle={{borderRadius: 5, width: 90, backgroundColor: "#37503c"}}
                title='Matfest'
                onPress = {() => {
                // Navigate to details route with parameter
                this.SearchFilterFunction("gr")}}
              />
              <Button
                backgroundColor='white'
                buttonStyle={{borderRadius: 5, width: 90, marginLeft: 15, marginRight: 25, backgroundColor: "#37503c"}}
                title='Medlem'
                onPress = {() => {
                  // Navigate to details route with parameter
                  this.SearchFilterFunction("al")}}
              />
            </View>
          </View>
          <View style={{marginTop:5}}>
            <FlatList 
              data={this.state.dataSource}
              //ItemSeparatorComponent={this.ListViewItemSeparator}
              renderItem={this.renderItem}
              enableEmptySections={false}
              style={{ marginLeft: 0, marginRight: 0, marginBottom: 347 }}
              keyExtractor = {(item, index) => index.toString()}
            />
          </View>
        </View>
        <MenuScreen navigation={this.props.navigation} />
      </ImageBackground>
    );
  }
}

class OverviewScreen2 extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }

  componentDidMount() {
    var return_array = global.fetch('https://lokalproducerativast.se/wp-json/tivala/v1/producerlist', {
      method: 'get',
      headers: new global.Headers({
        'Authorization': 'Basic ' + Buffer.from('api_2jWTR5iTIHOOxdIVqV2HFLPDJ0aQOMydlSGNbdoneEXGcI39JNC9R2W:uf6He48ci0H92Y7E5T6dmKAGuOiGE0PGwBlp51drqFHYehQP9HKBftu').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: undefined
    })
    .then(response => response.json())
    .then(responseJson => {
      //console.log(responseJson);
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson,
        },
        function() {
          this.arrayholder = responseJson;
        }
      );
    })
    .catch(error => {
      this.setState(
        {
          isLoading: false,
          dataSource: producer_list,
        },
        function() {
          this.arrayholder = producer_list;
        }
      );
    });
    
    //console.log(return_array);

    return return_array;
  }

  search = text => {
    //console.log(text);
  };

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.business_name ? item.business_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    return(
      <View 
        style = {{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  renderItem = ({ item }) => (
    <ListItem
      Component = {TouchableScale}
      friction = {90}
      tension = {100}
      activeScale = {0.95}
      linearGradientProps = {{
        colors: ['#558a87', '#436e6b'],
      }}
      ViewComponent = {LinearGradient}
      leftAvatar = {{ rounded: true, source: { uri: item.logo_url } }}
      title={item.business_name}
      titleStyle = {{ color: 'white', fontWeight: 'bold' }}
      subtitle = {"LPIV, Matfest"}
      subtitleStyle = {{ color: 'white' }}
      chevronColor="white"
      chevron
      containerStyle = {{ marginLeft: 5,
        marginRight: 5, 
        marginTop: 10, 
        borderRadius: 10, // adds the rounded corners
        backgroundColor: '#fff' }}

      onPress = {() => {
        // Navigate to details route with parameter
        this.props.navigation.navigate('Producer', {
          itemId: 86,
          otherParam: item.business_name,
          desc: item.description,
          image: item.logo_url,
          cover: item.cover_image_url,
          lat: item.latitude,
          long: item.longitude,
          adress: item.visiting_adress,
          name: item.business_name
        });
      }} 
    />
  )

  render() {
    data1= this.state.dataSource;
    columnData = data1;

    const viewStyles = [
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#827c34'
      },
      { backgroundColor: '#827c34' }
    ];

    return(
      <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}} style={viewStyles}>
        <HideStatusBar />
        <View style = {style.container}>
          <FlatList 
            data = {columnData}
            //ItemSeparatorComponent={this.ListViewItemSeparator}
            renderItem={this.renderItem}
            enableEmptySections={false}
            style={{ marginLeft: 20, marginRight: 20, marginBottom: 67}}
            keyExtractor = {(item, index) => index.toString()}
          />
        </View>
        <MenuScreen navigation={this.props.navigation} />
      </ImageBackground>
    );
  }
}

class ProducerListScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }

  componentDidMount() {
    var return_array = global.fetch('https://lokalproducerativast.se/wp-json/tivala/v1/producerlist', {
      method: 'get',
      headers: new global.Headers({
        'Authorization': 'Basic ' + Buffer.from('api_2jWTR5iTIHOOxdIVqV2HFLPDJ0aQOMydlSGNbdoneEXGcI39JNC9R2W:uf6He48ci0H92Y7E5T6dmKAGuOiGE0PGwBlp51drqFHYehQP9HKBftu').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: undefined
    })
    .then(response => response.json())
    .then(responseJson => {
      //console.log(responseJson);
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson,
        },
        function() {
          this.arrayholder = responseJson;
        }
      );
    })
    .catch(error => {
      this.setState(
        {
          isLoading: false,
          dataSource: producer_list,
        },
        function() {
          this.arrayholder = producer_list;
        }
      );
    });
    
    //console.log(return_array);

    return return_array;
  }

  search = text => {
    //console.log(text);
  };

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.business_name ? item.business_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    return(
      <View 
        style = {{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  renderItem = ({ item }) => (
    <ListItem
      onPress = {() => {
        // Navigate to details route with parameter
        this.props.navigation.navigate('Producer', {
          itemId: 86,
          otherParam: item.business_name,
          desc: item.description,
          image: item.logo_url,
          cover: item.cover_image_url,
          lat: item.latitude,
          long: item.longitude,
          adress: item.visiting_adress,
          name: item.business_name
        });
      }} 
      title={item.business_name}
      leftAvatar={{ source: { uri: item.logo_url } }}
      backgroundColor="#F7F7DA"
    />
  )

  render() {
    return(
      <View>
        <HideStatusBar />
        <View style = {{backgroundColor:"#F7F7DA"}}>
          <SearchBar
              round
              searchIcon={{ size: 24 }}
              onChangeText = {text => this.SearchFilterFunction(text)}
              onClear={text => this.SearchFilterFunction('')}
              placeholder="Sök..."
              value={this.state.search}
            />
            <FlatList 
              data={this.state.dataSource}
              backgroundColor="#F7F7DA"
              //ItemSeparatorComponent={this.ListViewItemSeparator}
              renderItem={this.renderItem}
              enableEmptySections={false}
              //style={{ marginTop: 10 }}
              keyExtractor = {(item, index) => index.toString()}
            ></FlatList>
        </View>
      </View>
    );
  }
}

class SplashScreen extends React.Component {
  render() {
    const viewStyles = [
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#827c34',
      },
      { backgroundColor: '#827c34' }
    ];
    
    const descriptionStyles = {
      color: '#d9d9d9',
      fontSize: 18,
      fontWeight: 'bold',
      padding:10,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
    };

    return (
      <ImageBackground source={require('./field2.png')} style={{width: '100%', height: '100%'}} style={viewStyles}>
        <HideStatusBar />
        <Image
          source={require('./lpiv3.png')}
          style={{ width: 300, height: 50, marginBottom: 0, 
            borderColor: '#99994d' }}
        />
        <View style={{marginBottom:222}}>
          <Text style={descriptionStyles}>
            En app med maten i fokus!
          </Text>
        </View>        
        <MenuScreen navigation={this.props.navigation} />
      </ImageBackground>
    );
  }
}

class HideStatusBar extends React.Component {
  render() {
    return (
      <View>
        <StatusBar backgroundColor="#b3e6ff" barStyle="light-content" />  
        <View>  
          <StatusBar hidden={true} />  
        </View>  
      </View>
    )
  }
}

class MenuScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const bottomViewStyles = {
      width: "100%",
      height: 50,
      backgroundColor: "#282828",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      flexDirection: 'row', flexWrap: 'wrap',
      marginTop: 5
    }
  
    const iconStyles = {
      flexDirection: 'row', 
      flexWrap: 'wrap', 
      height: 30, 
      width: 30, 
      marginRight: 30,
      marginTop: 10
    }

    return (
      <View style = {bottomViewStyles}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Start")}>
          <Image source={require('./menu_icons/start.png')} style={ iconStyles } />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Äta", {store_type:"Äta"})}>
          <Image source={require('./menu_icons/äta.png')} style={ iconStyles } />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Fika", {store_type:"Producent"})}>
          <Image source={require('./menu_icons/producent.png')} style={ iconStyles } />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Handla", {store_type:"Gårdsbutik"})}>
          <Image source={require('./menu_icons/gårdsbutik.png')} style={ iconStyles } />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Karta")}>
          <Image source={require('./menu_icons/karta.png')} style={ iconStyles } />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Sök")}>
          <Image source={require('./menu_icons/sök.png')} style={{ flexDirection: 'row', flexWrap: 'wrap', height: 30, width: 30, marginTop: 10 }} />
        </TouchableOpacity>
      </View>
    );
  }
}

const ProducerStack = createStackNavigator(
  {
    ProducerList: {
      screen: ProducerListScreen,
      navigationOptions: {
        header: null,
      }
    },
    Producer: {
      screen: ProducerScreen,
      navigationOptions: {
        header: null,
      }
    },
    Map: {
      screen: SingleMapScreen,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },  
  },
  {headerMode: 'screen'}
)

const ListStack = createStackNavigator(
  {
    ProducerList: {
      screen: OverviewScreen,
      navigationOptions: {
        header: null,
      }
    },
    Producer: {
      screen: ProducerScreen,
      navigationOptions: {
        header: null,
      }
    },
    Map: {
      screen: SingleMapScreen,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },  
  },
  {headerMode: 'screen'}
)

const TestStack2 = createStackNavigator(
  {
    ProducerList: {
      screen: OverviewScreen2,
      navigationOptions: {
        header: null,
      }
    },
    Producer: {
      screen: ProducerScreen,
      navigationOptions: {
        header: null,
      }
    },
    Map: {
      screen: SingleMapScreen,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },  
  },
  {headerMode: 'screen'}
)

const MenuStack = createStackNavigator(
  {
    Menu: {
      screen: MenuScreen,
      navigationOptions: {
        header: null,
      }
    },
    ProducerList: {
      screen: OverviewScreen2,
      navigationOptions: {
        header: null,
      }
    },
    Producer: {
      screen: ProducerScreen,
      navigationOptions: {
        header: null,
      }
    },
    Map: {
      screen: SingleMapScreen,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },  
  },
  {headerMode: 'screen'}
)

const MapStack = createStackNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        header: null,
      }
    },
    Producer: {
      screen: ProducerScreen,
      navigationOptions: {
        header: null,
      }
    }
  },
  
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },  
  },
  {headerMode: 'screen'}
)

const TabNavigator = createBottomTabNavigator(
  {
    Start: {
      screen: SplashScreen,
    },
    Äta: {
      screen: ListStack,
    },
    Fika: {
      screen: ListStack,
    },
    Handla: {
      screen: ListStack,
    },
    Karta: {
      screen: MapStack,
    },
    Sök: {
      screen: ProducerStack
    }

  },
  {
    tabBarOptions: {
      activeTintColor: '#d3edad',
      inactiveTintColor: '#373416',
      fontStyle: 'bold',
      height: 8,
      swipeEnabled: true,
      animationEnabled: true,
      lazy: true,
      labelStyle: {
        fontSize: 0,
        
        
      },
      style: {
        backgroundColor: '#282828',
        height: 0,
        fontStyle: 'bold'
      },
    }
  },
)

const AppContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  mapViewContainer: { flex: 1 },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16
  },
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginTop: Platform.OS == 'ios' ? 30 : 0
  },
  textStyle: {
    padding: 10,
  },
});

const style={
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 400
  },
  column: {
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  item: {
    flex: 1
  }
}

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
