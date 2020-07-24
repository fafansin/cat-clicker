class Cat{
    constructor(name, image){
        this._name = name;
        this._image = image;
        this._clicks = 0;
    }
    get name(){
        return this._name;
    }
    
    get image(){
        return this._image;
    }
    

    addClick(){
        this._clicks++;
    }

    get clicks(){
        return this._clicks;
    }

    get node(){
        const div = document.createElement('div');
        div.id = this._name;
        div.classList.add("cat", "card", "hidden");
        
        const h1 = document.createElement('h1');
        // h1.classList.add("name");
        h1.textContent = this._name;

        const img = document.createElement('img');
        img.src = this._image;

        const h2 = document.createElement('h2');
        h2.textContent = this._clicks;
        // h2.classList("clicks");

        div.append(h1);
        div.append(img);
        div.append(h2);

        return div;
    }
}

/**
 *  Declaring the list of cats
 */
const cats = [new Cat("garfield", "public/images/garfield.jpg"),
            new Cat("nermal", "public/images/nermal.jpg"),
            new Cat("lion", "public/images/lion.jpeg"),
            new Cat("jaga", "public/images/jaga.jpeg"),
            new Cat("pathro", "public/images/pathro.jpg"),
            ];

/**
 *  Rendering the thumbnails of cats
 */
const fragment = document.createDocumentFragment();
cats.forEach(cat=>{
    fragment.append(cat.node);
})
const catsView = document.getElementById("cats");

catsView.append(fragment);

/** 
 *  Registering click events on each cat
 */
catsView.addEventListener("click", (e)=>{
    const catDOM = e.target.parentElement;
    const catName = catDOM.id;

    const cat = cats.find(cat => cat.name === catName);
    if(cat != null){
        cat.addClick();
        catDOM.querySelector("h2").textContent = cat.clicks;
    }
    
}, false);

const catList = document.getElementById("catList");
const fragList = document.createDocumentFragment();
cats.forEach(cat =>{
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.id = cat.name;
    button.textContent = cat.name;

    li.append(button);
    fragList.append(li);

})

catList.append(fragList);

catList.addEventListener("click", function(e){
    const selectedCat = e.target.id.trim() !== '' ? e.target.id : null ;
    if(selectedCat != null){
        // console.log(selectedCat);
        cleanView();
        catsView.children.namedItem(selectedCat).classList.remove('hidden');
    }
});

function cleanView(){
    console.log("taena this");
    for(let i = 0; i < catsView.children.length; i++){
        let item = catsView.children[i]
        if(!item.classList.contains('hidden')) {
            item.classList.add('hidden');
        }
    }
}
