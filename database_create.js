var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var books = [{
      id:1,
      "isbn": "9789634069232",
      "cim": "Vaják I. - Az utolsó kívánság",
      "szerzo": "Sapkowski, Andrzej",
      "kiadas": "2019",
      "ar": 3052,
      "db" : 3,
      "img":"http://www.clker.com/cliparts/W/F/s/5/m/V/open-book-md.png",
      "leiras": "Fantasy"
    },
    {
      id:2,
      "isbn": "9789634069249",
      "cim": "Vaják II. - A végzet kardja",
      "szerzo": "Sapkowski, Andrzej",
      "kiadas": "2020",
      "ar": 3392,
      "db" : 1,
      "img":"http://www.clker.com/cliparts/W/F/s/5/m/V/open-book-md.png",
      "leiras": "fantasy"
    },
    {
      id:3,
      "isbn": "9789634069256",
      "cim": "Vaják III. - The Witcher",
      "szerzo": "Sapkowski, Andrzej",
      "kiadas": "2020",
      "ar": 3392,
      "db" : 7,
      "img":"http://www.clker.com/cliparts/W/F/s/5/m/V/open-book-md.png",
      "leiras": "Fantasy"
    },
    {
      id:4,
      "isbn": "9789635041558",
      "cim": "Tortúra",
      "szerzo": "Stephen King",
      "kiadas": "2020",
      "ar": 3399,
      "db" : 3,
      "img":"http://www.clker.com/cliparts/W/F/s/5/m/V/open-book-md.png",
      "leiras": "Horror"
    },
    {
      id:5,
      "isbn": "9789635040926",
      "cim": "Emelkedés",
      "szerzo": "Stephen King",
      "kiadas": "2020",
      "ar": 2549,
      "db" : 12,
      "img":"http://www.clker.com/cliparts/W/F/s/5/m/V/open-book-md.png",
      "leiras": "Horror"
    },
    {
      id:6,
      "isbn": "4678235691174",
      "cim": "Örökölt sors",
      "szerzo": "Orvos-Tóth Noémi",
      "kiadas": "2018",
      "ar": 2341,
      "db" : 1,
      "img":"http://www.clker.com/cliparts/W/F/s/5/m/V/open-book-md.png",
      "leiras": "Amikor elkezdjük kutatni elakadásaink, szorongásaink, elhibázott párkapcsolataink, ismétlődő kudarcaink okát, gyakran kiderül, hogy saját életünk történései nem adnak megfelelő magyarázatot."
    },
    {
      id:7,
      "isbn": "9786155031281",
      "cim": "A robotok és a mesterséges intelligencia titkai",
      "szerzo": "Nemere István",
      "kiadas": "2017",
      "ar": 679,
      "db" : 0,
      "img":"http://www.clker.com/cliparts/W/F/s/5/m/V/open-book-md.png",
      "leiras": "Néhány évvel, évtizeddel ezelőtt a mesterséges intelligencia még csak a science fiction irodalomban és álmokban létezett."
    },
    {
      id:8,
      "isbn": "9789633756188",
      "cim": "Szerelem az olajfák alatt",
      "szerzo": "Nemere István",
      "kiadas": "2016",
      "ar": 679,
      "db" : 10,
      "img":"http://www.clker.com/cliparts/W/F/s/5/m/V/open-book-md.png",
      "leiras": "A regény többről szól, mint a címe."
    },
    {
      id:9,
      "isbn": "9789639863187",
      "cim": "Az Android munkában",
      "szerzo": "Marziah Karch",
      "kiadas": "2010",
      "ar": 4760,
      "db" : 0,
      "img":"http://www.clker.com/cliparts/W/F/s/5/m/V/open-book-md.png",
      "leiras": "Az Android új, az Android nyílt forráskódú, az Android nagyszerű. Az üzleti élet egyre komolyabb szereplője."
    },
    {
      id:10,
      "isbn": "9789639863125",
      "cim": "Windows 7 lépésről lépésre",
      "szerzo": "Cox, Joyce,Preppernau, Joan",
      "kiadas": "2009",
      "ar": 5950,
      "db" : 0,
      "img":"http://www.clker.com/cliparts/W/F/s/5/m/V/open-book-md.png",
      "leiras": ""
    },
    {
      id:11,
      "isbn": "9789639863125",
      "cim": "Windows 8",
      "szerzo": "Cox, Joyce,Preppernau, Joan",
      "kiadas": "2008",
      "ar": 5950,
      "db" : 0,
      "img":"http://www.clker.com/cliparts/W/F/s/5/m/V/open-book-md.png",
      "leiras": "Windows 10"
    },
    {
      id:12,
      "isbn": "9789639863125",
      "cim": "Office 2019 lépésről lépésre",
      "szerzo": "Cox, Joyce,Preppernau, Joan",
      "kiadas": "2020",
      "ar": 11000,
      "db" : 0,
      "img":"http://www.clker.com/cliparts/W/F/s/5/m/V/open-book-md.png",
      "leiras": "Office csomag."
    },
    {
      id:13,
      "isbn": "9789639863125",
      "cim": "Windows 10",
      "szerzo": "Cox, Joyce,Preppernau, Joan",
      "kiadas": "2010",
      "ar": 8000,
      "db" : 0,
      "img":"http://www.clker.com/cliparts/W/F/s/5/m/V/open-book-md.png",
      "leiras": ""
    },
    {
      id:14,
      "isbn": "9789639863125",
      "cim": "Android 9 lépésről lépésre",
      "szerzo": "Cox, Joyce,Preppernau, Joan",
      "kiadas": "2020",
      "ar": 1111,
      "db" : 4,
      "img":"http://www.clker.com/cliparts/W/F/s/5/m/V/open-book-md.png",
      "leiras": ""
    },
    {
      id:15,
      "isbn": "9789639863125",
      "cim": "iOS 13 lépésről lépésre",
      "szerzo": "Cox, Joyce,Preppernau, Joan",
      "kiadas": "2009",
      "ar": 2222,
      "db" : 2,
      "img":"http://www.clker.com/cliparts/W/F/s/5/m/V/open-book-md.png",
      "leiras": "Apple iOS rendszere."
    },
    ];

MongoClient.connect(url, function(err, db) {
 
  var dbo = db.db("bookstore");

  dbo.createCollection("users", function(err, res) {

    console.log("Collection created!");
  });

  dbo.createCollection("books", function(err, res) {
     
      console.log("Collection created!");
      dbo.collection("books").insertMany(books, function(error, inserted) {
           if(error) {
               console.error(error);
           }
           else {
               console.log("Successfully inserted: " , inserted );
           }
       }); // end of insert

    });

});