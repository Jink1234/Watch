const data = [
    {
      id: 1,
      name: "Invicta Men's Pro Diver",
      img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
      price: 74,
      cat: "Dress",
    },
    {
      id: 11,
      name: "Invicta Men's Pro Diver 2",
      img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
      price: 74,
      cat: "Dress",
    },
    {
      id: 2,
      name: "Timex Men's Expedition Scout ",
      img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
      price: 40,
      cat: "Sport",
    },
    {
      id: 3,
      name: "Breitling Superocean Heritage",
      img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
      price: 200,
      cat: "Luxury",
    },
    {
      id: 4,
      name: "Casio Classic Resin Strap ",
      img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
      price: 16,
      cat: "Sport",
    },
    {
      id: 5,
      name: "Garmin Venu Smartwatch ",
      img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
      price: 74,
      cat: "Casual",
    },
  ];

  
  const productsContainer=document.querySelector(".products");
  const searchInput=document.querySelector(".search")
  const categoriesContainer=document.querySelector(".cats");
  const pricerange=document.querySelector(".priceRange");
  const priceValue = document.querySelector(".priceValue");

  const displayProducts=(filteredProducts)=>{
    productsContainer.innerHTML=(filteredProducts.map(product=>(
        `
        <div class="product">
        <img
        src=${product.img}
        alt=""
        />
                     <span class="productname">${product.name}</span>
                     <span class="productText">${product.price}</span>
                </div>
        `
    )).join(""))
  }

  searchInput.addEventListener("keyup",(e)=>{
    const value=e.target.value.toLowerCase().replace(/\s/g, '');
    console.log(value)
    if(value){
        displayProducts(
            data.filter((item)=> item.name.toLowerCase().replace(/\s/g, '').indexOf(value) !==-1)
        );
    }else{
        displayProducts(data)
    }
  })

  const setCategories=(data)=>{
    const allcats=data.map(item => item.cat)
   //console.log(allcats)
   const categories =["All",...allcats.filter(
    (item,i) => {return allcats.indexOf(item)===i}
   )]
    categoriesContainer.innerHTML=categories.map(item=>(
        `
        <span class="cat">${item}</span>
        `
    )).join("")

    categoriesContainer.addEventListener("click",(e) =>{
        console.log(e.target.textContent)

        const prodtext =e.target.textContent;

        prodtext === "All" ?  displayProducts(data) :  displayProducts(data.filter( item => item.cat === prodtext));

    })
  }

  const setPrices=(data)=>{
    const priceList=data.map(item =>(item.price))
    // console.log(priceList);
    const maxprice =Math.max(...priceList)
    // console.log(maxprice)
    const minprice = Math.min(...priceList)
    // console.log(minprice)

    pricerange.min=minprice;
    pricerange.max=maxprice;
    pricerange.value=maxprice;
    priceValue.textContent = "$" + maxprice;

    pricerange.addEventListener("input",(e)=>{
        priceValue.textContent="$"+e.target.value;
        displayProducts(data.filter(item => item.price <= e.target.value))
    })
  }
  setCategories(data);
  displayProducts(data);
  setPrices(data);