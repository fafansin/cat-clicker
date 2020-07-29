
const model = {
    currentCat:null,
    isAdmin:false,
    cats:[
            {name:"garfield", image:"public/images/garfield.jpg", score:0},
            {name:"nermal", image:"public/images/nermal.jpg", score:0},
            {name:"lion", image:"public/images/lion.jpeg", score:0},
            {name:"jaga", image:"public/images/jaga.jpeg", score:0},
            {name:"pathro", image:"public/images/pathro.jpg", score:0}
        ]
}
const controller = {
    init:function(){
        model.currentCat = model.cats[0];
        catsView.init();
        catView.init();
        formView.init();
    },
    getCurrentCat:function(){
        return model.currentCat;
    },
    setCurrentCat:function(cat){
        model.currentCat = cat
    },
    getCats:function(){
        return model.cats;
    },
    addScore:function(){
        model.currentCat.score++;
        catView.render();
    },
    updateCat:function(name, image, score){
        model.currentCat.name = name;
        model.currentCat.image = image;
        model.currentCat.score = score;
        //
        catView.render();
        this.setIsAdmin(false);
    },
    setIsAdmin:function(flag){
        model.isAdmin = flag;
        formView.render();
    },
    getIsAdmin:function(){
        return model.isAdmin;
    }

}

const formView = {
    init:function(){
        this.btAdmin = document.getElementById("btAdmin");
        this.form = document.getElementById("editForm");
        this.btCancel = document.getElementById("btCancel");
        this.btSave = document.getElementById("btSave");
        //
        this.iName = document.getElementById("cName");
        this.iImage = document.getElementById("cImage");
        this.iScore = document.getElementById("cScore");
        /**
         *  Registering Events
         */
        // To disable page reload on form submit
        // Display edit form
        btAdmin.addEventListener("click", function(e){
            controller.setIsAdmin(true);
        });
        // Hide Edit Form
        btCancel.addEventListener("click", function(e){
            controller.setIsAdmin(false);
        });
        this.form.addEventListener("submit", (function(view){
            return function(e){
                e.preventDefault();
                controller.updateCat(view.iName.value, view.iImage.value, view.iScore.value);
            }
        })(this));
    },

    render:function(){
        if(controller.getIsAdmin()){
            this.populate();
        }else{
            this.clear();
        }
    },
    populate:function(){
        let cat = controller.getCurrentCat();
        this.iName.value = cat.name;
        this.iImage.value = cat.image;
        this.iScore.value = cat.score;
        this.form.classList.remove('hidden');
    },
    clear:function(){
        this.form.classList.add('hidden');
        this.iName.value = '';
        this.iImage.value = '';
        this.iScore.value = '';
        
    }
}

const catView = {
    init:function(){
        this.catView = document.getElementById("catView");
        this.catName = document.getElementById("catName");
        this.catImage = document.getElementById("catImage");
        this.catScore = document.getElementById("catScore");
        //
        this.catImage.addEventListener("click", function(e){
            controller.addScore();
        });

        this.render();
    },
    render:function(){
        let cat = controller.getCurrentCat();
        //
        this.catName.textContent = cat.name;
        this.catImage.src = cat.image;
        this.catScore.textContent = cat.score;
    }
}
const catsView = {
    init:function(){
        this.catList = document.getElementById("catList");
        //
        this.render();
    },
    render:function(){
        catList.innerHTML = '';
        let cats = controller.getCats();
        //
        cats.forEach(cat => {
            let li = document.createElement("li");
            li.textContent = cat.name;

            li.addEventListener("click", (function(cat){
                return function(){
                    controller.setCurrentCat(cat);
                    view.renderItem();
                }
            })(cat));
            catList.appendChild(li);
        });
    },
}
controller.init();
