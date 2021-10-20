import { getLinks, getLinkById, addNewLink, updateLink, deleteLink } from '../controllers/linkController'

const routes = (app) => {
    app.route('/link')
        .get(getLinks)
        .post(addNewLink)
    
    app.route('/link/:linkId')
        .get(getLinkById)
        .put(updateLink)
        .delete(deleteLink)
}

export default routes;