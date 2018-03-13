var dataModule = (function () {
    //var name = "Main Module";

    var name = "name" || null;

    var filterConfig = {
        author: null,
        hashTags: null,
        createdAt: null,
    }

    var sortConfig = {
        author: "",
        hashTags: "",
        createdAt: "desc",
    }

    function setFilterConfig(element) {
        switch (element.id) {
            case "searchByAuthorId":
                filterConfig.author = element.value || null;
                break;
            case "searchByTagId":
                filterConfig.hashTags = element.value || null;
                break;
            case "searchByDateId":
                filterConfig.createdAt = element.value || null;
                break;
            default:
                alert("Warning! This filter isn't implemented.");
        }

        return filterConfig;
    }

    function setSortConfig(element) {
        sortConfig.author = null;
        sortConfig.hashTags = null;
        sortConfig.createdAt = null;

        switch (element.id) {
            case "author":
                sortConfig.author = element.className;
                break;
            case "hashTags":
                sortConfig.hashTags = element.className;
                break;
            case "createdAt":
                sortConfig.createdAt = element.className;
                break;
            default:
                alert("Warning! This sort isn't implemented.");
        }

        element.className = element.className.indexOf("asc") >= 0 ? "desc" : "asc";

        return sortConfig;
    }

    // private methods and functions ...

    function  getDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function find(data, propertyName, propertyValue) {
        let result = [];

        for (var i = 0; i < data.length; i++) {
            let value = data[i][propertyName];

            if (typeof(value) === "object" || !value) {
                if (Array.isArray(value) && value.indexOf(propertyValue) >= 0 || propertyValue === null) {
                    result.push(data[i]);
                }
                else if (value instanceof Date && (getDate(value).getTime() === getDate(propertyValue).getTime() || propertyValue === null)) {
                    result.push(data[i]);
                }
            }
            else if (typeof(value) === "string" && (value === propertyValue || propertyValue === null)) {
                result.push(data[i]);
            }
        }

        return result;
    }

    function filter(data, filterConfig) {
        let filteredData = data;

        for (var entity in filterConfig) {
            filteredData = find(filteredData, entity, filterConfig[entity]);
        }

        return filteredData;
    }

    function sort(data, sortConfig) {
        let sortedData = data;

        if (sortConfig.author) {
            sortedData = sortConfig.author === "asc" ? data.sort(sortByAuthorAsc) : data.sort(sortByAuthorDesc);
        }
        else if (sortConfig.createdAt) {
            sortedData = sortConfig.createdAt === "asc" ? data.sort(sortByDateAsc) : data.sort(sortByDateDesc);
        }
        else if (sortConfig.hashTags) {
            sortedData = sortConfig.hashTags === "asc" ? data.sort(sortByTagAsc) : data.sort(sortByTagDesc);
        }

        return sortedData;
    }

    // ... private methods and functions

    function sortByAuthorAsc(post1, post2) {
        return (post2.author < post1.author) - (post1.author < post2.author);
    }

    function sortByAuthorDesc(post1, post2) {
        return (post1.author < post2.author) - (post2.author < post1.author);
    }

    function sortByDateAsc(post1, post2) {
        return post1.createdAt - post2.createdAt;
    }

    function sortByDateDesc(post1, post2) {
        return post2.createdAt - post1.createdAt;
    }

    function sortByTagAsc(post1, post2) {
        return post1.hashTags.length - post2.hashTags.length;
    }

    function sortByTagDesc(post1, post2) {
        return post2.hashTags.length - post1.hashTags.length;
    }

    function paging(data, skip, top, filterConfig, sortConfig) {
        data = sort(data, sortConfig);
        data = filter(data, filterConfig);
        data = data.slice(skip, skip + top);

        return data;
    }

    function findPostById(id) {
        for (var i = 0; i < photoPosts.length; i++){
            if (photoPosts[i].id === id) {
                return i;
            }
            else {
                return -1;
            }
        }
    }

    function getPhotoPost(id) {
        if (findPostById(id) !== -1) {
            return  photoPosts[findPostById(id)];
        }
        else {
            return -1;
        }
    }

    function validatePhotoPost(photoPost) {
        if (photoPost.id !== undefined && find("id", photoPost.id).length === 0 && typeof(photoPost.id) === "string" &&
            photoPost.description !== undefined && typeof(photoPost.description) === "string" && photoPost.description.length < 200 &&
            photoPost.createdAt !== undefined && photoPost.createdAt instanceof  Date &&
            photoPost.author !== undefined && photoPost.author.length > 0 && typeof(photoPost.author) === "string" &&
            photoPost.photoLink !== undefined && photoPost.photoLink.length > 0 && typeof(photoPost.photoLink) === "string"
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    function addPhotoPost(photoPost) {
        if (validatePhotoPost(photoPost)) {
            photoPost.authorPhoto = photoPost.authorPhoto || "images\\person.png";
            photoPosts.push(photoPost);

            return true;
        }
        else {
            return false;
        }
    }

    function editPhotoPost(id, photoPost) {
        if (validatePhotoPost(photoPost)) {
            getPhotoPost(id).description = photoPost.description || getPhotoPost(id).description;
            getPhotoPost(id).photoLink = photoPost.photoLink || getPhotoPost(id).photoLink;
            getPhotoPost(id).hashTags = photoPost.hashTags || getPhotoPost(id).hashTags;

            return true;
        }
        else {
            return false;
        }
    }

    function removePhotoPost(id) {
        if (findPostById(id) !== -1) {
            photoPosts.splice(findPostById(id), 1);
        }
    }

    /*
    function sort(element) {
        if (element.id === "author") {
            if (element.className === "asc") {
                photoPosts.sort(sortByAuthorAsc);
                getPhotoPosts(0, 10, filterConfig);
            }
            else if (element.className === "desc") {
                photoPosts.sort(sortByAuthorDesc);
                getPhotoPosts(0, 10, filterConfig);
            }
        }
        else if (element.id === "createdAt") {
            if (element.className === "asc") {
                photoPosts.sort(sortByDateAsc);
            }
            else if (element.className === "desc") {
                photoPosts.sort(sortByDateDesc);
            }
        }
        else if (element.id === "hashTags") {
            if (element.className === "asc") {
                photoPosts.sort(sortByTagAsc);
            }
            else if (element.className === "desc") {
                photoPosts.sort(sortByTagDesc);
            }
        }
        element.className = element.className.indexOf("asc") >= 0 ? "desc" : "asc";

        return photoPosts;
    }
    */
    /*------------------------------------------------------------*/
    return {
        //getPhotoPosts: getPhotoPosts,
        getPhotoPost: getPhotoPost,
        validatePhotoPost: validatePhotoPost,
        addPhotoPost: addPhotoPost,
        editPhotoPost: editPhotoPost,
        removePhotoPost: removePhotoPost,
        //sort: sort,
        paging: paging,
        setSortConfig: setSortConfig,
        setFilterConfig: setFilterConfig,
        filterConfig: filterConfig,
        sortConfig: sortConfig,
    }

}());

