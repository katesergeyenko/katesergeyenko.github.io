var domModule = (function () {

    var displayConfig = {
        skip: 0,
        top: 10,
    }

    // private methods and functions ...

    function displayHashTags(itemList) {
        let result = "";

        if (itemList) {
            for (let i = 0; i < itemList.length; i++) {
                result += '<div class="tag-form">' + itemList[i] + '</div>';
            }
        }

        return result;
    }

    function displayPhotoPost (photoPost) {
        let result = "";
        result +=

                '<table class="posts-table"> \
                    <tr> \
                        <td class="post-left"> \
                            <div class="owner">\
                                <a href="userPage.html"> <img src="' + photoPost.authorPhoto + '" alt="There is personal photo" class="userPhoto"></a> \
                            <h3><a href="userPage.html">' + photoPost.author + '</a></h3> \
                        </div> \
                        <div class="like" /> \
                    </td> \
                    \
                    <td class="post-center">\
                        <img class="photo-post" src="' + photoPost.photoLink + '">\
                    </td> \
                    \
                    <td class="post-right"> \
                        <div class="post-description"> \
                            <h3>' + photoPost.description + '</h3> \
                        </div> \
                        <div class="post-tags">' +
                            displayHashTags(photoPost.hashTags) +
                    '</div>\
                    <table class="control-table"> \
                        <tr> \
                            <td>\
                                <div class="edit"></div>\
                            </td>\
                            <td>\
                                <div class="remove"></div>\
                            </td>\
                        </tr>\
                    </table>\
                    <div> \
                        <time class="post-time">' + photoPost.createdAt + '</time> \
                            </div> \
                        </td> \
                    </tr> \
                </table>'

                ;

        return result;
    }

    function displayPhotoPosts (id, data, displayConfig) {
        let photoPostsContainer = document.getElementById(id);
        photoPostsContainer.innerHTML = "";
        for (let i = 0; i < displayConfig.top && data[i]; i++) {
            photoPostsContainer.innerHTML += displayPhotoPost(data[i]);
        }

        return photoPostsContainer.innerHTML;
    }

    // ... private methods and functions

    function display(data, skip, top, filterConfig, sortConfig) {
        data = dataModule.paging(data, skip, top, filterConfig, sortConfig);
        displayPhotoPosts("photoPostsContainer", data, displayConfig);
    }

    function removePhotoPost(id) {
        if (dataModule.name == dataModule.getPhotoPost(id).author) {
            dataModule.removePhotoPost(id);
            display(photoPosts, 0, 10, dataModule.filterConfig, dataModule.sortConfig);
        }
    }

    function editPhotoPost(id) {
        if (dataModule.name == dataModule.getPhotoPost(id).author) {
            dataModule.editPhotoPost(id, ); /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
            display(photoPosts, domModule.displayConfig.skip, domModule.displayConfig.top, dataModule.filterConfig, dataModule.sortConfig);
        }
    }

    function displayNext() {
        //displayConfig.skip += 10;
        if (displayConfig.skip + displayConfig.top < photoPosts.length) {
            displayConfig.skip += displayConfig.top;
            display(photoPosts, displayConfig.skip, displayConfig.top, dataModule.filterConfig, dataModule.sortConfig);
        }
    }

    function displayPrevious() {
        //displayConfig.skip -= 10;
        if (displayConfig.skip - displayConfig.top >= 0) {
            displayConfig.skip -= displayConfig.top;
            display(photoPosts, displayConfig.skip, displayConfig.top, dataModule.filterConfig, dataModule.sortConfig);
        }
    }

    /*------------------------------------------------------------*/
    return {
        display: display,
        removePhotoPost: removePhotoPost,
        editPhotoPost: editPhotoPost,
        displayConfig: displayConfig,
        displayNext: displayNext,
        displayPrevious: displayPrevious,
    }

}());

