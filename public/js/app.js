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
        getCats:function(){
            return model.cats;
        },
        addScore:function(){
            model.currentCat.score++;
            view.renderItem();
        },
        updateCat:function(name, image, score){
            model.currentCat.name = name;
            model.currentCat.image = image;
            model.currentCat.score = score;
            //
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
            //
            this.btAdmin = document.getElementById("btAdmin");
            this.editForm = document.getElementById("editForm");
            this.btCancel = document.getElementById("btCancel");
            this.btSave = document.getElementById("btSave");
            //
            this.iName = document.getElementById("cName");
            this.iImage = document.getElementById("cImage");
            this.iScore = document.getElementById("cScore");
            
            btAdmin.addEventListener("click", (function(form){
                return function(){
                    form.classList.remove("hidden");
                    view.renderItem();
                }
                
            })(this.editForm));

            btCancel.addEventListener("click", (function(form){
                return function(){
                    form.classList.add("hidden");
                    view.renderItem();
                }
            })(this.editForm));

            btSave.addEventListener("click", (function(form){
                return function(){
                    controller.updateCat(view.iName.value, view.iImage.value, view.iScore.value);
                }
            })(this.editForm));

            editForm.addEventListener("submit", function(e){
                e.preventDefault();
            })
            
            
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
                        controller.setCurrentCat(cat);
                        view.renderItem();
                    }
                })(cat));
                view.catList.appendChild(li);
            });
            
        },
        renderItem:function(){
            let cat = controller.getCurrentCat();
            
            catName.textContent = cat.name;
            catImage.src = cat.image;
            catScore.textContent = cat.score;
            //
            this.iName.value = cat.name;
            this.iImage.value = cat.image;
            this.iScore.value = cat.score;
        }
    }

    controller.init();
})();