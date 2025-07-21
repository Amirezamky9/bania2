bania-store/
├── .env
├── .gitignore
├── package.json
├── server.js
└── src/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── auth.controller.js
    │   ├── category.controller.js
    │   ├── dashboard.controller.js
    │   ├── order.controller.js
    │   ├── product.controller.js
    │   └── user.controller.js
    ├── middlewares/
    │   ├── auth.middleware.js
    │   └── error.middleware.js
    ├── models/
    │   ├── category.model.js
    │   ├── order.model.js
    │   ├── product.model.js
    │   └── user.model.js
    ├── routes/
    │   ├── auth.routes.js
    │   ├── category.routes.js
    │   ├── dashboard.routes.js
    │   ├── index.js
    │   ├── order.routes.js
    │   ├── product.routes.js
    │   └── user.routes.js
    └── utils/
        ├── ApiError.js
        ├── ApiResponse.js
        └── asyncHandler.js
