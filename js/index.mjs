import {
  addImage,
  deleteImage,
  addComment,
  deleteComment,
  getImage,
  logImages, 
  getComment,
  logComments,
} from "./api.mjs";
let imageId = 0;
console.log("imageId");
//load page
document.addEventListener("DOMContentLoaded", function () {
  console.log("Page loaded!");
  //localStorage.clear();
  //check if there is any image in gallery
  if (getImage(imageId)){
    console.log("got the image");
  }
  //getComment(imageId);
  logComments();
  getComment(imageId);

});
//toggle form
document.getElementById("new-image-btn").addEventListener("click", function() {
  let form = document.getElementById("image-form");
  if (form.style.display == "none"){
    form.style.display = "block";
    this.querySelector("h2").textContent = "Hide New Image Form";
  }
  else{
    form.style.display = "none"
    this.querySelector("h2").textContent = "Show New Image Form";
  }
});




//get the url from the form then add it to the database
document.getElementById("image-form").addEventListener("submit", function(event){
  event.preventDefault();
  const author = document.getElementById("image-author").value;
  const url = document.getElementById("image-url").value;
  const title = document.getElementById("image-title").value;
  addImage(title, author, url);
  getImage(imageId);
  console.log("adding image");
  this.reset();
});

//delete image
document.getElementById("delete").addEventListener("click", function(){
  imageId = deleteImage(imageId);
  console.log("imageId after delete " + imageId);
  getImage(imageId);
  getComment(imageId);
});

//previous image (change imageId)
document.getElementById("previous").addEventListener("click", function(){
  imageId--;
  getImage(imageId);
  getComment(imageId);
  console.log("imageId: " + imageId);
});

//next image (change imageId)
document.getElementById("next").addEventListener("click", function(){
  imageId++;
  getImage(imageId);
  getComment(imageId);
  console.log("imageId: " + imageId);
});


//comment section form 
document.getElementById("comment-form").addEventListener("submit", function(event){
  event.preventDefault();
  let author = document.getElementById("comment-author").value
  let content = document.getElementById("comment-content").value
  addComment(imageId, author, content);
  getComment(imageId);
  this.reset();
  console.log("adding comments");
});

document.getElementById("comment-section").addEventListener("click", function(e){
  if (e.target.classList.contains("delete-comment")) {
    let commentId = e.target.closest(".comment").dataset.commentId;
    console.log(" "+ commentId);
    deleteComment(commentId);
    getComment(imageId);
    return;
  }


});