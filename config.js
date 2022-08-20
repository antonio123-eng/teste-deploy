module.exports = {
   async headers() {
      return {
         source: "/:path*",
         headers: [
            {key: "Access-Control-Allow-Credentials", value: "true"},
            {key: "Access-Control-Allow-Origin", value: "*"},
            {key: "Access-Control-Allow-Methods", value: "GET, OPTIONS, POST, DELETE, PUT"},
            {key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With"}
         ]
      }
   }
}