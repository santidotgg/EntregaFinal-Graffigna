const products = [
    {
        id: 1,
        title: "Dualsense Wireless Controller",
        description: "DualSense Wireless Controller for PlayStation 5 and PC",
        price: 1000,
        pictureUrl: "https://http2.mlstatic.com/D_NQ_NP_665357-MLA46237938567_062021-O.webp",
        stock: 10,
        category: "Games&Consoles"
    },
    {
        id: 2,
        title: "Logitech G Series Lightspeed G305",
        description: "Mouse de juego inalámbrico black",
        price: 500,
        pictureUrl: "https://http2.mlstatic.com/D_NQ_NP_977588-MLA51172463642_082022-O.webp",
        stock: 1,
        category: "Perifericos"
    },
    {
        id: 3,
        title: "Logitech Master Series MX Keys",
        description: "Teclado bluetooth QWERTY español España color grafito con luz blanca",
        price: 1500,
        pictureUrl: "https://http2.mlstatic.com/D_NQ_NP_882215-MLA52149106951_102022-O.webp",
        stock: 5,
        category: "Perifericos"
    }
]

export const getProducts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(products), 2000)
    })
}

export const getProductById = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(products.find(product => product.id == id)), 2000)
    })
}

export const getProductsByCategory = (category) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(products.filter(product => product.category == category)), 2000)
    })
}