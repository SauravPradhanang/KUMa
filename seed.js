const mongoose = require("mongoose");
const {Category} = require('./models/category');

mongoose
  .connect("mongodb+srv://christmasbhandari:Gyarados99@goodygoody.56ot4.mongodb.net/eshop")
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error("MongoDB connection error:", err));



  const sampleCategories = [
    
    {
      name: "Iphone 15",
      color: "White"
    },
    {
      name: "Asus TUF",
      color: "Grey"
    },
    {
        name: "Apple",
        color: "Starlight"
      },
      {
        name: "Vaseline",
        color: "Cream"
      },
      {
        name: "Ramen Korean",
        color: "Spicy"
      },

  ];
  
  module.exports = sampleCategories;
  

  const seedDatabase = async () => {
    try {
      await Category.deleteMany({});
      await Category.insertMany(sampleCategories);
      console.log("Database seeded successfully!");
      mongoose.connection.close();
    } catch (err) {
      console.error("Error seeding database:", err);
    }
  };
  
  seedDatabase();


<script>
    document.addEventListener('DOMContentLoaded', () => {
        const images = document.querySelectorAll('.card-img');

        images.forEach(image => {
            image.addEventListener('click', async (event) => {
                event.stopPropagation(); // Prevent parent handlers from interfering
                console.log('Image clicked!');
                const clickedImage = event.target;

                const id = clickedImage.getAttribute('image-id');

                /*
                try {
                    const res = await fetch(`/products/${id}`, {
                        method: 'GET',
                    });
                    //res.render('product');

                    // Handle the response, e.g. navigate to the book page
                  if (res.ok) {
                        window.location.href = `/products/${id}`;
                    } else {
                        console.error('Failed to load book details');
                    }

                */

                try{
                    window.location.href = `/products/${id}`;
                }
                catch (err) {
                    console.log(err);
                }

            });
        });

    });

</script>

const Array= mongoose_model_ko_name.find();//database bata nikalne array of items.
const options= {keys: ["name", "description"], threshold: 0 dekhi 1 samma kunai number};//options set garne kata khojne vanera.
const fuse= new Fuse(Array, options);
fuse.search('search query');//yesko return chai match hune items haru vayo array bata.