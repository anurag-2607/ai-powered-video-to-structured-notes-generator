// Simulating an API endpoint delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  login: async (email, password) => {
    await delay(1200); // Simulate network latency
    if (email === "user@example.com" && password === "password123") {
      return { token: "mock-jwt-token-xyz", user: { email, name: "Developer Guest" } };
    }
    throw new Error("Invalid email or password");
  },

  signup: async (name, email, password) => {
    await delay(1200);
    return { token: "mock-jwt-token-xyz", user: { email, name } };
  },

  resetPassword: async (email) => {
    await delay(1000);
    return { message: "Reset link sent to your email" };
  }
};