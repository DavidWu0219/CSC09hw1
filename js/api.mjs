/*  ******* Data types *******
    image objects must have at least the following attributes:
        - (String) imageId 
        - (String) title
        - (String) author
        - (String) url
        - (Date) date

    comment objects must have the following attributes
        - (String) commentId
        - (String) imageId
        - (String) author
        - (String) content
        - (Date) date

image url:
https://images.unsplash.com/photo-1506744038136-46273834b3fb
https://images.unsplash.com/photo-1507525428034-b723cf961d3e
https://images.unsplash.com/photo-1516117172878-fd2c41f4a759
https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d

****************************** */

// add an image to the gallery
export function addImage(title, author, url) {
    let images = JSON.parse(localStorage.getItem("images"));
    if (!images) {
        images = [];
    }
    let imageId = images.length;
    let date = Date.now();

    let image = {
        imageId: imageId,
        title: title,
        author: author,
        url: url,
        date: date
    }
    images.push(image);
    localStorage.setItem("images", JSON.stringify(images));
}


//here i get the image then update the html accordingly
export function getImage(imageId){
    let images = JSON.parse(localStorage.getItem("images"));
    if (!images || images.length == 0){
        //no image, display a msg "no image" and disbale all the btns for img
        disable(-1);
        let elmt = document.getElementById("image");
        elmt.src = "";
        return;
    }
    let image = images[imageId]
    console.log("yes img");
    //display it
    disable(imageId);
    console.log(imageId);
    let elmt = document.getElementById("image");
    elmt.src = image.url;
    return;
}

// delete an image from the gallery given its imageId, then return a new imageId
export function deleteImage(imageId) {
    let images = JSON.parse(localStorage.getItem("images")); //get images
    if (!images){
        console.error("delete img wrong, count get array, or array empty");
        return;
    }
    images.splice(imageId, 1); 
    console.log("splicing it...");
    images.forEach((img, new_id) => { //since we splice it we have to update the imageId as well
        img.imageId = new_id;
    });
    console.log("reordering index...");
    localStorage.setItem("images", JSON.stringify(images)); //update
    //delete the attaching cmt
    deleteAllComment(imageId)
    
    if (images.length == 1 || imageId == 0){
        //only one img and we took that out
        return 0;
    }
    else {
        return --imageId;
    }
    
   
}

//helper function 

function deleteAllComment(imageId){
    let comments = JSON.parse(localStorage.getItem("comments"));
    console.log("deleting all comt");
    const new_comments = comments.filter(c => c.imageId !== imageId);
    new_comments.forEach(function(comment, newId) { //reorder index
        comment.commentId = newId;
    });
    localStorage.setItem("comments", JSON.stringify(new_comments));
}

function disable(imageId){
    let images = JSON.parse(localStorage.getItem("images")); //get images
    let elmt = document.getElementById("no-image");
    document.querySelectorAll("#image-btn button").forEach((btn) => {
        btn.disabled = false;
      });
    if (imageId == -1){
        //no imaes in gallery disbable everything
        elmt.style.display = "block";
        document.querySelectorAll("#image-btn button").forEach((btn) => {
            btn.disabled = true;
          });
        return;
    }
    else if (imageId == 0){
        //the first image should not have previus btn 
        elmt.style.display = "none";
        document.getElementById("previous").disabled = true;
        if (images.length == 1 ){ //one and only
            document.getElementById("next").disabled = true;
        }
    }
    else if (imageId +1 == images.length ){
        //the last img should not have next btn
        elmt.style.display = "none";
        document.getElementById("next").disabled = true;
    }
}






// add a comment to an image
export function addComment(imageId, author, content) {
    let comments = JSON.parse(localStorage.getItem("comments"));
    if (!comments) {
        comments = [];
    }
    let commentId = comments.length;
    let date = Date.now();

    let comment = {
        commentId: commentId,
        imageId: imageId,
        author: author,
        content: content,
        date: date
    }
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
}

export function getComment (imageId){
    let comments = JSON.parse(localStorage.getItem("comments"));
    console.log("geeting comments");
    if (!comments){
        console.log("no comments")
        return;
    }
    //clear it first 
    document.getElementById("comment-section").innerHTML = "";
    comments.forEach(function(comm){
        if (comm.imageId == imageId){
        let elmt = document.createElement("div");
        elmt.className = "comment";
        elmt.dataset.commentId = comm.commentId;
        elmt.innerHTML = `
            <div class="comment-autho">${comm.author} says...</div>
            <div class="comment-content">${comm.content}</div>
            <button class="delete-comment">Delete Comment</button>
    `;
    document.getElementById("comment-section").append(elmt);
    }
    });

}

// delete a comment to an image
export function deleteComment(commentId) {
    let comments = JSON.parse(localStorage.getItem("comments"));
    if (!comments){
        console.error("delete cmt wrong, cant get array, or array empty");
        return;
    }
    comments.splice(commentId, 1); 
    
    comments.forEach(function(comment, newId) { //since we splice it we have to update the commentId as well
        comment.commentId = newId;
    });
    localStorage.setItem("comments", JSON.stringify(comments));
    return;
}

export function logImages() {
    let images = JSON.parse(localStorage.getItem("images")); //get images
    if (!images){
        return;
    }
    images.forEach((image) => {
      console.log("Image ID:", image.imageId);
      console.log("Title:", image.title);
      console.log("Author:", image.author);
      console.log("URL:", image.url);
      console.log("Date:", image.date);
      console.log("------");
    });
  }

  export function logComments() {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    if (comments.length === 0) {
      console.log("No comments found.");
      return;
    }
  
    comments.forEach((comment) => {
      console.log("Comment ID:", comment.commentId);
      console.log("Image ID:", comment.imageId);
      console.log("Author:", comment.author);
      console.log("Content:", comment.content);
      console.log("Date:", comment.date);
      console.log("------");
    });
  }
  