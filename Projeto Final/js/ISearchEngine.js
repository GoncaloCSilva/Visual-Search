'use strict';
let lastRow = 1;
class ISearchEngine {
    constructor(dbase) {
        this.allpictures = new Pool(3000);
        this.colors = ["red", "orange", "yellow", "green", "Blue-green", "blue", "purple", "pink", "white", "grey", "black", "brown"];
        this.redColor = [204, 251, 255, 0, 3, 0, 118, 255, 255, 153, 0, 136];
        this.greenColor = [0, 148, 255, 204, 192, 0, 44, 152, 255, 153, 0, 84];
        this.blueColor = [0, 11, 0, 0, 198, 255, 167, 191, 255, 153, 0, 24];
        this.categories = ["beach", "birthday", "face", "indoor", "manmade/artificial", "manmade/manmade","manmade/urban", "marriage", "nature", "people", "outdoor", "party", "no_people", "snow"];
        this.XML_file = dbase;
        this.XML_db = new XML_Database();
        this.LS_db = new LocalStorageXML();
        this.num_Images = 1;
        this.numshownpic = 35;
        this.imgWidth = 190;
        this.imgHeight = 140;
        this.randomInit = null;
        this.searched = null;
        this.img_paths = [];
        this.img_colors = [];
        this.color = null;
    }
    init(cnv) {
        addNewGrid();
        this.databaseProcessing(cnv);   //Comment to run in realtime
    }
    init() {
        addNewGrid();
        this.databaseProcessing();   //Comment to run in realtime
    }
    // method to build the database which is composed by all the pictures organized by the XML_Database file
    // At this initial stage, in order to evaluate the image algorithms, the method only compute one image.
    // However, after the initial stage the method must compute all the images in the XML file
    databaseProcessing (cnv) {
        let h12color = new ColorHistogram(this.redColor, this.greenColor, this.blueColor);
        let colmoments = new ColorMoments();


        let img = new Picture(0, 0, cnv.width, cnv.height,"Images/Images/beach/img_1.jpg", "test");

        let eventname = "processed_picture_" + img.impath;
        let eventP = new Event(eventname);
        let self = this;
        document.addEventListener(eventname, function(){
            self.imageProcessed(img, eventname);
        },false);

        img.computation(cnv, h12color, colmoments, eventP);
    }
    
    databaseProcessing () {
        let h12color = new ColorHistogram(this.redColor, this.greenColor, this.blueColor);
        let colmoments = new ColorMoments();
        let random = Math.floor(Math.random()*(14)) + 1;
        if(this.searched == null){
        if(this.randomInit == null)switch (random) {
                case 1:
                    this.randomInit = "beach"
                break;
                case 2:
                this.randomInit = "birthday"
                break;
                case 3:
                    this.randomInit = "face"
                break;
                case 4:
                    this.randomInit = "indoor"
                break;
                case 5:
                    this.randomInit = "manmade/artificial"
                break;
                case 6:
                    this.randomInit = "manmade/manmade"
                break;
                case 7:
                    this.randomInit = "manmade/urban"
                break;
                case 8:
                    this.randomInit = "marriage"
                break;
                case 9:
                    this.randomInit = "nature"
                break;
                case 10:
                    this.randomInit = "no_people"
                break;
                case 11:
                    this.randomInit = "outdoor"
                break;
                case 12:
                    this.randomInit = "party"
                break;
                case 13:
                    this.randomInit = "people"
                break;
                case 14:
                    this.randomInit = "snow"
                break;
                default:
                    console.log(random);
            }
            for (let i = lastRow; i < count; i++) {
            
                const cnv = document.getElementById("canvas" + i);

                let img = new Picture(0, 0, document.getElementById("canvas" + i).width, document.getElementById("canvas" + i).height,"Images/Images/"+this.randomInit+"/img_"+ i +".jpg", "test");

                let eventname = "processed_picture_" + img.impath;
                let eventP = new Event(eventname);
                let self = this;
                document.addEventListener(eventname, function(){
                    self.imageProcessed(img, eventname);
                },false);

                img.computation(cnv, h12color, colmoments, eventP);
            }
            lastRow = count;
        }
        else if(this.img_paths.length == 0) this.showKeyImages(this.searched);
        else this.showColorImages(this.img_paths);
    }

    showKeyImages(search){
        
        
        for (let i = 1; i < count; i++) {
        console.log(count)
        const cnv = document.getElementById("canvas" + i);

        let img = new Picture(0, 0, document.getElementById("canvas" + i).width, document.getElementById("canvas" + i).height,"Images/Images/"+search+"/img_"+ i +".jpg", "test");

        let eventname = "processed_picture_" + img.impath;
        let eventP = new Event(eventname);
        let self = this;
        document.addEventListener(eventname, function(){
            self.imageProcessed(img, eventname);
        },false);

        img.computation(cnv, h12color, colmoments, eventP);
        }
        lastRow = count;
    }

    showColorImages(paths){
        let h12color = new ColorHistogram(this.redColor, this.greenColor, this.blueColor);
        let colmoments = new ColorMoments();
        
        if(count < paths.length)
        for (let i = 0; i < count-1; i++) {
        let j = i+1;
        let cnv = document.getElementById("canvas" + j);

        let img = new Picture(0, 0, document.getElementById("canvas" + j).width, document.getElementById("canvas" + j).height,"Images/"+ paths[i], "test");

        let eventname = "processed_picture_" + img.impath;
        let eventP = new Event(eventname);
        let self = this;
        document.addEventListener(eventname, function(){
            self.imageProcessed(img, eventname);
        },false);

        img.computation(cnv, h12color, colmoments, eventP);
        }
        else{
            for (let i = 0; i < paths.length-1; i++) {
                let j = i+1;
                let cnv = document.getElementById("canvas" + j);
        
                let img = new Picture(0, 0, document.getElementById("canvas" + j).width, document.getElementById("canvas" + j).height,"Images/"+ paths[i], "test");
        
                let eventname = "processed_picture_" + img.impath;
                let eventP = new Event(eventname);
                let self = this;
                document.addEventListener(eventname, function(){
                    self.imageProcessed(img, eventname);
                },false);
        
                img.computation(cnv, h12color, colmoments, eventP);
            }

            for (let i = paths.length; i < count; i++) {
                console.log("DEBUUUUUUUUUUUG TIMEEEEE")
                let j = i;
                let cnv = document.getElementById("canvas" + j);
                let img = new Picture(0, 0, document.getElementById("canvas" + j).width, document.getElementById("canvas" + j).height,"Images/"+ paths[i], "test");
                img.clear(cnv);
            }
        }
        lastRow = count;
    }

    //When the event "processed_picture_" is enabled this method is called to check if all the images are
    //already processed. When all the images are processed, a database organized in XML is saved in the localStorage
    //to answer the queries related to Color and Image Example
    imageProcessed (img, eventname) {
        this.allpictures.empty_Pool();
        this.allpictures.insert(img);
       // console.log("image processed " + this.allpictures.stuff.length + eventname);
        if (this.allpictures.stuff.length === (this.num_Images * this.categories.length)) {
            //this.createXMLColordatabaseLS();
            //this.createXMLIExampledatabaseLS();
        }
    }

    removeImage () {
        this.allpictures.remove();
       // console.log("image processed " + this.allpictures.stuff.length + eventname);
        if (this.allpictures.stuff.length === (this.num_Images * this.categories.length)) {
            //this.createXMLColordatabaseLS();
            //this.createXMLIExampledatabaseLS();
        }
    }

    //Method to create the XML database in the localStorage for color queries
    createXMLColordatabaseLS() {

        // this method should be completed by the students

    }

    //Method to create the XML database in the localStorage for Image Example queries
    createXMLIExampledatabaseLS() {
        let list_images = new Pool(this.allpictures.stuff.length);
        this.zscoreNormalization();


        // this method should be completed by the students

    }

    //A good normalization of the data is very important to look for similar images. This method applies the
    // zscore normalization to the data
    zscoreNormalization() {
        let overall_mean = [];
        let overall_std = [];

        // Inicialization
        for (let i = 0; i < this.allpictures.stuff[0].color_moments.length; i++) {
            overall_mean.push(0);
            overall_std.push(0);
        }

        // Mean computation I
        for (let i = 0; i < this.allpictures.stuff.length; i++) {
            for (let j = 0; j < this.allpictures.stuff[0].color_moments.length; j++) {
                overall_mean[j] += this.allpictures.stuff[i].color_moments[j];
            }
        }

        // Mean computation II
        for (let i = 0; i < this.allpictures.stuff[0].color_moments.length; i++) {
            overall_mean[i] /= this.allpictures.stuff.length;
        }

        // STD computation I
        for (let i = 0; i < this.allpictures.stuff.length; i++) {
            for (let j = 0; j < this.allpictures.stuff[0].color_moments.length; j++) {
                overall_std[j] += Math.pow((this.allpictures.stuff[i].color_moments[j] - overall_mean[j]), 2);
            }
        }

        // STD computation II
        for (let i = 0; i < this.allpictures.stuff[0].color_moments.length; i++) {
            overall_std[i] = Math.sqrt(overall_std[i]/this.allpictures.stuff.length);
        }

        // zscore normalization
        for (let i = 0; i < this.allpictures.stuff.length; i++) {
            for (let j = 0; j < this.allpictures.stuff[0].color_moments.length; j++) {
                this.allpictures.stuff[i].color_moments[j] = (this.allpictures.stuff[i].color_moments[j] - overall_mean[j]) / overall_std[j];
            }
        }
    }

    //Method to search images based on a selected color
    searchColor(category, color) {
        this.img_paths = [];
        this.img_colors = [];
        category=category.toLowerCase(); // Make sure it's safe
        for (let i = 0; i < this.categories.length; i++) { 
            if (this.categories[i].includes(category)) {
                this.searched = this.categories[i];
                break;
        }
        }
        let xmlDoc = this.XML_db.loadXMLfile(this.XML_file);
        let paths = this.XML_db.SearchXML(this.searched,xmlDoc,100);
        let images = this.XML_db.getColor(this.searched,xmlDoc,100);
        //console.log(images);
        //console.log(paths);
        this.color = color;
        for(let i = 0; i < images.length; i++){
            console.log("Test " + paths[i] +" "+this.color_meter(images[i],color));
            if(this.color_meter(images[i],color) < 20) this.img_paths.push(paths[i]);
            console.log(this.img_paths)
        }
        this.databaseProcessing();
    }

    //Method to search images based on keywords
    searchKeywords(category) {
        this.img_paths = [];
        this.img_colors = [];
        category=category.toLowerCase(); // Make sure it's safe
        for (let i = 0; i < this.categories.length; i++) { 
            if (this.categories[i].includes(category)) {
                this.searched = this.categories[i];
                this.showKeyImages(this.searched);
                break;
        } 
        }
    }

    //Method to compute the Manhattan difference between 2 images which is one way of measure the similarity
    //between images.
    calcManhattanDist(img1, img2){
        let manhattan = 0;

        for(let i=0; i < img1.color_moments.length; i++){
            manhattan += Math.abs(img1.color_moments[i] - img2.color_moments[i]);
        }
        manhattan /= img1.color_moments.length;
        return manhattan;
    }

    //Method to sort images according to the Manhattan distance measure
    sortbyManhattanDist(idxdist,list){

        // this method should be completed by the students
    }

    //Method to sort images according to the number of pixels of a selected color
    sortbyColor (idxColor, list) {
        list.sort(function (a, b) {
            return b.hist[idxColor] - a.hist[idxColor];
        });
    }

    //Method to visualize images in canvas organized in columns and rows
    gridView (canvas) {

        // this method should be completed by the students

    }



    //Function to calculate distance between two colors
    /** 
   color_meter(color1,color2) {
    
    let _cwith2  = (color1.charAt(0)=="#") ? color1.substring(1,7) : color1;
    let _ccolor2 = (color2.charAt(0)=="#") ? color2.substring(1,7) : color2;
    
    let _r = parseInt(_cwith2.substring(0,2), 16);
    let _g = parseInt(_cwith2.substring(2,4), 16);
    let _b = parseInt(_cwith2.substring(4,6), 16);

    let __r = parseInt(_ccolor2.substring(0,2), 16);
    let __g = parseInt(_ccolor2.substring(2,4), 16);
    let __b = parseInt(_ccolor2.substring(4,6), 16);
    
    let p1 = (_r / 255) * 100;
    let p2 = (_g / 255) * 100;
    let p3 = (_b / 255) * 100;

    let perc1 = Math.round((p1 + p2 + p3) / 3);
    
    p1 = (__r / 255) * 100;
    p2 = (__g / 255) * 100;
    p3 = (__b / 255) * 100;
    
    let perc2 = Math.round((p1 + p2 + p3) / 3);
    
    let result = Math.abs(perc1 - perc2);
    return result
}
*/
color_meter(color1,color2) {
    
    let _cwith2  = (color1.charAt(0)=="#") ? color1.substring(1,7) : color1;
    let _ccolor2 = (color2.charAt(0)=="#") ? color2.substring(1,7) : color2;
    
    let _r = parseInt(_cwith2.substring(0,2), 16);
    let _g = parseInt(_cwith2.substring(2,4), 16);
    let _b = parseInt(_cwith2.substring(4,6), 16);

    let __r = parseInt(_ccolor2.substring(0,2), 16);
    let __g = parseInt(_ccolor2.substring(2,4), 16);
    let __b = parseInt(_ccolor2.substring(4,6), 16);
    
    let result = Math.abs((_r-__r) + (_g-__g) + (_b-__b));
    return result
}
}      


class Pool {
    constructor (maxSize) {
        this.size = maxSize;
        this.stuff = [];

    }

    insert (obj) {
        if (this.stuff.length < this.size) {
            this.stuff.push(obj);
        } else {
            alert("The application is full: there isn't more memory space to include objects");
        }
    }

    remove () {
        if (this.stuff.length !== 0) {
            this.stuff.pop();
        } else {
           alert("There aren't objects in the application to delete");
        }
    }

    empty_Pool () {
        while (this.stuff.length > 0) {
            this.remove();
        }
    }
}