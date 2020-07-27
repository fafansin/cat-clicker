(function(){
    const model = {
        cats:[{name:"garfield", image:"public/images/garfield.jpg", score:0},
            {name:"nermal", image:"public/images/nermal.jpg", score:0},
            {name:"lion", image:"public/images/lion.jpeg", score:0},
            {name:"jaga", image:"public/images/jaga.jpeg", score:0},
            {name:"pathro", image:"public/images/pathro.jpg", score:0}
        ],
        getCats:function(){
            return model.cats;
        },
        getCat:function(name){
            return model.cats.find(cat => cat.name === name);
        },
        addScore:function(name){
            let cat = model.getCat(name);
            cat.score++;
        }

    }
    const controller = {
        init:function(){
            view.init();
        },
        getCats:function(){
            return model.getCats();
        },
        viewCat:function(e){
            const cat = model.getCat(e.target.id);
            if(cat != null){
                view.renderItem(cat);
            }
        },
        addScore:function(e){
            const catName = e.target.id ? e.target.id : e.target.parentElement.id;
            if(catName){
                model.addScore(catName);
                view.renderItem(model.getCat(catName));
            }
        }
    }
    const view = {
        init:function(){
            const catList = document.getElementById("catList");
            const catView = document.getElementById("catView");
            catList.addEventListener("click", controller.viewCat, false);
            catView.addEventListener("click", controller.addScore, false);

            view.renderList();
        },
        renderList:function(){
            let htmlStr = '';
            controller.getCats().forEach(cat => {
                htmlStr += `<li><button id="${cat.name}">${cat.name}</button></li>`;
            });
            console.log(catList);
            catList.innerHTML = htmlStr;
        },
        renderItem:function(cat){
            catView.innerHTML = '';
            let htmlStr = '';
            htmlStr += `<div id="${cat.name}" class="cat card">
                            <h1>${cat.name}</h1>
                            <img src="${cat.image}" alt="${cat.name}">
                            <h2>${cat.score}</h2>
                        </div>`;
            catView.innerHTML = htmlStr;
        }
    }

    controller.init();
})();