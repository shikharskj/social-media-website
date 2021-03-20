{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
           
            
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
                
            });
           $("#post-i").val("");
        });
    }


    // method to create a post in DOM
            let newPostDom = function(post){
                return $(`
                <li class="posts" id="post-${post._id}">
                    <div class="single-post">
            
                        <div class="a">
                            <b>${post.user.name}</b>
                           
                                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                        
                        </div>
            
                        <div class="b">
                            ${post.content}
                        </div>
                        
                        
                        
                    </div>
                    <div class="post-comments">
                       
                            <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                            <input id="comment-i" type="text" class="comment_input" name="content" placeholder="Write a comment..." required>
                            <input type="hidden" class="comment_input_submit" name="post" value="${post._id}">
                            <input type="submit" value="Comment">
                            </form>
                        
            
                        <div class="post-comments-list">
                            <div>
                                <ul id="post-comments-${post._id}">
                                   
                                        
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
            `)
            }


    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }





    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    //createPost();
   // convertPostsToAjax();
}