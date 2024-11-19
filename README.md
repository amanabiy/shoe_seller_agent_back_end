# Shoe Seller Agent

Welcome to the **Shoe Seller Agent**! This application is designed to provide an efficient and personalized shopping experience for customers looking for the perfect pair of shoes. Leveraging the power of generative AI, this agent assists users in finding shoe recommendations, managing their shopping cart, and more.

## Features

# Shoe Seller Agent

Welcome to the **Shoe Seller Agent**! This application is designed to provide an efficient and personalized shopping experience for customers looking for the perfect pair of shoes. Leveraging the power of generative AI, this agent assists users in finding shoe recommendations, managing their shopping cart, and more.

## Features

### 1. **Shoe Recommendations**
- **Personalized Suggestions**: The agent uses AI to provide shoe recommendations based on user preferences and inputs.
- **Filter Options**: Users can filter shoes by various attributes such as gender, fit, condition, use case, season, and weather.

### 2. **Shopping Cart Management**
- **Add to Cart**: Users can add recommended shoes directly to their shopping cart.
- **Remove from Cart**: Users can easily remove items from their cart if they change their mind.
- **View Cart**: The agent provides a summary of the items currently in the user's cart.

### 3. **Interactive Chat**
- **AI-Powered Conversations**: The agent interacts with users through a chat interface, making the shopping experience conversational and engaging.
- **Query Handling**: Users can ask questions about products, availability, and receive prompt responses.

### 4. **User Authentication**
- **JWT-Based Authentication**: Secure login and registration process using JSON Web Tokens (JWT) to ensure user data privacy and security.
- **Current User Access**: Users can access their profile and manage their preferences and settings.

### 5. **Advanced Search and Filtering**
- **Detailed Search**: Users can search for shoes using detailed criteria to find exactly what they need.
- **Range and Enum Filters**: The application supports advanced filtering options to narrow down search results effectively.

### 6. **Seamless Integration**
- **Gemini API**: Integration with the Gemini API allows for enhanced AI capabilities and improved user interactions.
- **Google Generative AI API**: Utilizes Google's Generative AI to provide intelligent and context-aware responses to user queries.

### 7. **Responsive Design**
- **User-Friendly Interface**: The application features a clean and intuitive design, ensuring a smooth user experience across all devices.
- **Mobile Compatibility**: The interface is optimized for both desktop and mobile use.

## Getting Started

### Prerequisites
- Node.js
- Docker
- Docker Compose

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/shoe-seller-agent.git
   cd shoe-seller-agent
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Copy the `.env.sample` file to create your `.env` file:
   ```bash
   cp .env.sample .env
   ```
   Then, populate the `.env` file with your specific configuration:
   ```plaintext
   JWT_SECRET=your_jwt_secret
   MYSQL_ROOT_PASSWORD=your_mysql_password
   MYSQL_DATABASE=your_mysql_database
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the Application with Docker Compose**
   ```bash
   docker-compose up
   ```

### Usage

- **Visit the Application**: Open your browser and go to `http://localhost:3000`.
- **Interact with the Agent**: Use the chat interface to start receiving shoe recommendations and manage your shopping cart.

## Contributing

We welcome contributions to the Shoe Seller Agent! If you have suggestions for new features or improvements, please feel free to submit a pull request or open an issue.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


### Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

### Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using the Shoe Seller Agent! We hope you have a great shopping experience. If you have any questions or need support, please don't hesitate to contact me at my email `amanuelabiy.as@gmail.com`