// menghubungkan mongose dengan database, dan database (localstorage)
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/movie_db")
  .then((res) => {
    console.log("Connect to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// schema : untuk standarisasi struktur data

// schema sandar
const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  director: String,
  year: Number,
  rating: Number,
});

// schema dengan Validasi
const actorSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
  umur: {
    type: Number,
    required: true,
  },
  asal: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
});

// Schema Prducts (Moderen)
const ProductsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [1, "Mininal Nama memiliki 1 huruf"], // pesan yang akan di sampaikan validator
    maxlength: [100, "Maksimal Nama 100 huruf"],
  },
  brand: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Nilai tidak boleh Minus"],
  },
  color: {
    type: String,
    required: true,
  },
  size: [   
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
    maxlength: 150,
  },
  condition: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  availability: {
    online: {
      type: Boolean,
      required: true,
    },
    offline: {
      type: Boolean,
      required: true,
    },
  },
});

// model : mengarahkan ke collections mana
const Movie = mongoose.model("movies", movieSchema);
const Actor = mongoose.model("actors", actorSchema);
const Product = mongoose.model("products", ProductsSchema);

// strukturisasi data yang ingin dimasukan
const movie = new Movie({
  title: "Black Phanter",
  genre: "Action",
  director: "Ryan Coogler",
  rating: 7.3,
  year: 2018,
});
//strukturisasi dengan data asal (untuk validasi)
const aktor = new Actor({
  nama: "Jhosua",
  umur: "tigapuluh lima tahun",
  asal: ["Jakarta", "Bandung"],
});
// data kompleks
const prodak = new Product({
  name: "Kemeja Flanel",
  brand: "Hollister",
  price: 750000,
  color: "biru muda",
  size: ["S", "M", "L"],
  description:
    "Kemeja flanel dengan warna yang cerah, terbuat dari bahan flanel yang nyaman dan berkualitas tinggi.",
  condition: "baru",
  stock: 25,
  availability: {
    online: true,
    offline: true,
  },
});

// ============== Insert() ==============

// insert one

// movie.save();
const aktorSave = ()=>{
  aktor.save()
  .then((response)=>{
    console.log(response)
}).catch((error)=>{
    console.log('Error', error)
})
}
// prodak.save();

// insertMany mengunakan async/await
const uploadMany = async () => {
  try {
    const response = await Movie.insertMany([
      {
        title: "Iron Man",
        genre: "Action",
        director: "Marvel",
        rating: 8.1,
        year: 2009,
      },
      {
        title: "Avenger",
        genre: "Action",
        director: "Marvel",
        rating: 8.9,
        year: 2012,
      },
      {
        title: "Titanic",
        genre: "Romance",
        director: "Dicaprio",
        rating: 9.2,
        year: 1995,
      },
      {
        title: "Interstelar",
        genre: "Sci-Fi",
        director: "Christoper Nolan",
        rating: 9.7,
        year: 2014,
      },
    ]);
    console.log("it works");
    console.log(response);
  } catch (err) {}
};
// uploadMany()

// ============== find() ==============

//find Data mengunakan Then/catch
function findData() {
  Movie.find({ genre: "Action" })
    .then((response) => {
      console.log("Find : ", response);
    })
    .catch((err) => {
      console.log(err);
    });
}

// find One
const findOne = () => {
  Movie.findOne({ year: { $gt: 2010 } })
    .then((response) => {
      console.log("Find One : ", response);
    })
    .catch((error) => {
      console.log(error);
    });
};

// find by ID
const findById = () => {
  Movie.findById("6734e43e9e77f6d701f001ab")
    .then((response) => {
      console.log("Find By Id : ", response);
    })
    .catch((error) => {
      console.log(error);
    });
};
// findData();
// findOne();
// findById();

// ============== Update() ==============

// UpdateOne
const updateOne = () => {
  Movie.updateOne({ title: "Iron Man" }, { rating: 7 })
    .then((response) => {
      console.log("Update One : ", response);
    })
    .catch((error) => {
      console.log(error);
    });
};
// UpdateMany
const updateMany = () => {
  Movie.updateMany({ year: { $gte: 2023 } }, { title: "new" })
    .then((response) => {
      console.log("Update One : ", response);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Update By Id  (VALAIDATOR)
const updateById = () => {
  Movie.findByIdAndUpdate(
    "6734e43e9e77f6d701f001a9", // id yang dituju
    { rating: 8 }, //data yang diubah
    {
      new: true, // mereturn data perubahan terbaru
      runValidators: true, // menjalanakan validasi saat update data
    }
  )
    .then((response) => {
      console.log("Update By Id", response);
    })
    .catch((error) => {
      console.log(error);
    });
};
// updateOne();
// updateMany();
// updateById();

// ============== Delete() ==============

// DeleteOne
const deleteOne = () => {
  Movie.deleteOne({ title: "Flash" })
    .then((response) => {
      console.log("Delete One : ", response);
    })
    .catch((error) => {
      console.log(error);
    });
};
// DeleteMany
const deleteMany = () => {
  Movie.deleteMany({ year: 2023 })
    .then((response) => {
      console.log("Delete Many : ", response);
    })
    .catch((error) => {
      console.log(error);
    });
};
// RemoveById
const removeById = () => {
  Movie.findByIdAndDelete("6734e43e9e77f6d701f001a0")
    .then((response) => {
      console.log("Delete Many : ", response);
    })
    .catch((error) => {
      console.log(error);
    });
};
// deleteOne();
// deleteMany();
// removeById();

// ============== Method() ==============

// Method OutOfStock
ProductsSchema.methods.outStock = function () {
  this.stock = 0;
  this.availability.online = false;
  this.availability.offline = false;
  return this.save();
};

const changeStock = async (id) => {
  const foundProduct = await Product.findById(id);
  await foundProduct.outStock(); // method yang dijalankan
  console.log("berhasil dirubah");
};
// changeStock();

// Method Static
ProductsSchema.statics.closeStore = function () {
  return this.updateMany(
    {},
    {
      stock: 0,
      "availability.onlilne": false,
      "availability.offline": false,
    }
  );
};
const closeAllStore = () => {
  Product.closeStore()
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
// closeAllStore();

// Method Virtual Property
actorSchema.virtual("namaAsal").get(function () {
  return `${this.nama} ${this.asal}`;
});
console.log(aktor.namaAsal);

// ===== MiddleWare (pre/post) ===== 
actorSchema.pre('save', async ()=>{ //fungsi yang akan dijalankan sebelum melakukan save
  console.log('pesiapan menyimpan data')
})
actorSchema.post('save', async()=>{ //fungsi yang akan dijalankan setelah melakukan save
  console.log('data berhasil disimpan')
})

const aktor2 = new Actor({
  nama:'Denny sumargo',
  umur:41,
  asal:'Makasar'
})

aktor2.save()