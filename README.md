

# Prefood App

## 1. Summary

**Prefood** is a comprehensive wholesale delivery application designed to streamline the procurement process for food service establishments like restaurants, cafes, and hotels. The app facilitates efficient ordering of bulk items, ensuring smooth operations and timely supply management.

## 2. Objective

The objective of the Prefood app is to provide a seamless and efficient platform for food service establishments to manage their inventory and order supplies. The app aims to simplify the procurement process by integrating essential features for both admins and customers, thus enhancing overall operational efficiency.

## 3. Methodology

- **Data Management:** Utilized Firebase for real-time data synchronization and storage, with Cloud Firestore for advanced querying and offline capabilities.
- **Authentication:** Implemented Firebase Authentication for secure and user-friendly sign-in options for both admins and customers.
- **App Development:** Developed the app using React Native for cross-platform compatibility, ensuring a consistent experience on both iOS and Android.
- **UI/UX Design:** Created intuitive interfaces for both admin and customer modules to facilitate easy navigation and management of orders.
- **Testing and Optimization:** Conducted thorough testing to ensure reliability and performance, optimizing the app for seamless user interactions.

## 4. Technology Used

- **React Native:** For building natively-rendered mobile applications with code reusability and high performance.
- **Firebase:** Provides a suite of backend services including real-time database, authentication, and cloud functions.
- **Firebase Authentication:** Simplifies user authentication with support for multiple providers and secure methods.
- **Firebase Firestore:** Offers a scalable, flexible NoSQL cloud database with real-time synchronization and advanced querying.
- **Excel:** For data management and analysis during the development phase.

## 5. Result

The Prefood app successfully integrates essential features for both admins and customers. Admins can manage shops, categories, products, and user requests, while customers can place orders, view request histories, and manage their profiles. The app enhances procurement efficiency and provides a robust platform for food service establishments to manage their bulk orders effectively.

## 6. Conclusion

The Prefood app effectively addresses the needs of the food service industry by providing a streamlined and user-friendly platform for ordering and inventory management. Utilizing modern technologies such as React Native and Firebase, the app ensures high performance and scalability, making it a valuable tool for restaurants, cafes, and hotels to manage their procurement processes efficiently.

Here’s how you can add these instructions to your README file under a new section titled **Running the Application**:

---

## 7. Running the Application

Before running the application, ensure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions up to the "Creating a new application" step.

### Step 1: Start the Metro Server

To begin, start **Metro**, the JavaScript bundler that comes with React Native.

Navigate to the root directory of your React Native project and run the following command:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Start your Application

Let Metro Bundler continue running in its own terminal. Open a new terminal from the root directory of your React Native project. Use the following commands to start your application on an Android or iOS device:

#### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

#### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

---

This addition will guide users through the necessary steps to run the Prefood app on their development environment, ensuring that they have everything set up properly.

