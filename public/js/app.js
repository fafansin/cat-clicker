(function(){
    const model = {
        currentCat:null,
        cats:[{name:"garfield", image:"public/images/garfield.jpg", score:0},
            {name:"nermal", image:"public/images/nermal.jpg", score:0},
            {name:"lion", image:"public/images/lion.jpeg", score:0},
            {name:"jaga", image:"public/images/jaga.jpeg", score:0},
            {name:"pathro", image:"public/images/pathro.jpg", score:0}
        ]
    }
    const controller = {
        init:function(){
            model.currentCat = model.cats[0];
            view.init();
        },
        getCurrentCat:function(){
            return model.currentCat;
        },
        setCurrentCat:function(cat){
            model.currentCat = cat
        },
        addScore:function(){
            model.currentCat.score++;
            view.renderItem();
        }
    }
    const view = {
        init:function(){
            this.catList = document.getElementById("catList");
            this.catView = document.getElementById("catView");
            this.catName = document.getElementById("catName");
            this.catImage = document.getElementById("catImage");
            this.catScore = document.getElementById("catScore");
            
            this.catImage.addEventListener("click", function(e){
                controller.addScore();
            })

            view.renderList();
            view.renderItem();
        },
        renderList:function(){
            catList.innerHTML = '';

            controller.getCats().forEach(cat => {
                let li = document.createElement("li");
                li.textContent = cat.name;

                li.addEventListener("click", (function(cat){
                    return function(){
                        console.log("event triggered");
                        controller.setCurrentCat(cat);
                        view.renderItem();
                    }
                })(cat));
                view.catList.appendChild(li);
            });
            
        },
        renderItem:function(){
            let cat = controller.getCurrentCat();
            console.log(cat);
            catName.textContent = cat.name;
            catImage.src = cat.image;
            catScore.textContent = cat.score;
        }
    }

    controller.init();
})();