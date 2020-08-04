

const cats = [
    {name:"garfield", image:"public/images/garfield.jpg", score:0, nicknames: ['uno', 'dos', 'tres', 'quatro', 'sinko']},
    {name:"nermal", image:"public/images/nermal.jpg", score:0, nicknames: ['sais', 'syete', 'otso', 'nuwbe', 'dyis']},
    {name:"lion", image:"public/images/lion.jpeg", score:0, nicknames: ['snoop', 'shit', 'lambada']},
    {name:"jaga", image:"public/images/jaga.jpeg", score:0, nicknames: ['dolor', 'Ipsum', 'Lorem', 'asdf', 'dawe']},
    {name:"pathro", image:"public/images/pathro.jpg", score:0, nicknames: ['loran', 'faye', 'magic']}
]
const Cat = function(data){
    this.catName = ko.observable(data.name);
    this.score = ko.observable(data.score);
    this.imageURL = ko.observable(data.image);
    this.nickNames = ko.observableArray(data.nicknames);
    
    this.level = ko.computed(function(){
        switch(true){
            case (this.score() <= 10):
                return 'infant';
                break;
            case (this.score() <= 20):
                return 'child';
                break;
            case (this.score() <= 30):
                return 'teen';
                break
            case (this.score() <= 40):
                return 'adult';
                break
            default:
                return 'old';
                break
        }
    }, this);
}

function ViewModel(){
    const self = this;
    
    this.catList = ko.observableArray([]);
    
    cats.forEach(function(cat){
        self.catList.push(new Cat(cat));
    });

    this.currentCat = ko.observable(self.catList()[0]);
    this.addScore = function(){
        this.score(this.score() + 1);
    }
    this.selectCat = function(){
        self.currentCat(this);
    }
}

ko.applyBindings(new ViewModel());