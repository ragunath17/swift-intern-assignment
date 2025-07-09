# SWIFT Front-End Internship Assignment Reference Document

---

**Objective:** Develop a dashboard page with specific functionalities using provided dummy data APIs, focusing on front-end development, user interface design, data handling, and client-side data persistence.

**Timeline:** The assignment is to be completed and submitted within 48 hours from the time of receiving it.

**Technical Specifications:**

- **User Interface:** Use React for constructing user interfaces.
- **UI Components:** Implement UI components using any library of your choice.
- **Language:** All code must be written in plain JavaScript. TypeScript can be used optionally.
- **Browser Compatibility:** Ensure cross-browser compatibility (Edge, Firefox, Chrome).

---

### Step-by-Step Implementation Guide:

**Step 1: Project Setup and Structure**

1. **Initialize React Project:** Create a new React project using your preferred method (e.g., Create React App).
2. **Define Application Structure:** The application will consist of two main screens:
    - **Profile Screen:** Displays information from the first record of the users' dummy API.
    - **Comments Dashboard:** Displays all comments from the dummy API.
3. **Implement Routing:** Integrate proper routing between the Profile and Comments Dashboard pages.

**Step 2: Profile Screen Implementation**

1. **Data Loading:**
    - Fetch user data from the dummy users API.
    - Utilize only the *first record* from the fetched data for the profile screen.
2. **UI Design:**
    - Render the user's profile information (e.g., User ID, Name, Email ID, Address, Phone) as per the provided wireframe for the Profile Screen.
    - Ensure the profile screen is **not editable**.
3. **Navigation:**
    - Add functionality to navigate back to the dashboard page from the profile screen.
    

**Step 3: Comments Dashboard Implementation**

1. **Data Population:**
    - Fetch all 500 records from the dummy comments API.
    - Represent these records as a paginated data grid.
2. **Pagination (Custom Implementation):**
    - **Do NOT** use any in-built library features for pagination.
    - Implement custom logic for page selection and page size.
    - **Page Size Options:** Provide options for 10, 50, and 100 records per page.
3. **Searching (Partial Search):**
    - Implement partial search logic for the
        
        `name`, `email`, and `phone` fields within the comments data.
        
4. **Sorting (Custom Implementation):**
    - Implement sorting logic for `Post ID`, `Name`, and `Email` columns.
    - **Sorting Behavior:**
        - Initial click on a sortable column (e.g., Name) should sort in **ascending order**.
        - A second click on the *same column* should sort in **descending order**.
        - Subsequent clicks on the *same column* should cycle through: **no sort -> ascending -> descending -> no sort**.
        - Only **one column** should be actively sorted at a time.
5. **Persistence:**
    - When the page is refreshed, the applied search, sort, current page, and page size filters should **persist**.  This implies using client-side storage (e.g., Local Storage or Session Storage).
    

**Step 4: UI/UX and Responsiveness**

1. **Design Quality:**
    - Refer to the provided wireframes for screen design (Page 3 of the PDF).
    - Feel free to enhance the UI beyond the wireframes.
2. **Responsiveness:**
    - Ensure the screens are responsive and optimized for mobile viewing.
3. **Component Usage:** Prioritize self-implemented components over library components where feasible, especially for core functionalities like pagination and sorting.

**Step 5: Code Quality and Best Practices**

1. **Plain JavaScript/TypeScript:** Adhere to plain JavaScript, or optionally using TypeScript is optional. 
2. **Cross-Browser Compatibility:** Test the application across Edge, Firefox, and Chrome.
3. **Core Logic Implementation:** Demonstrate a strong understanding of the core logic required for search, sort, and pagination.

---

### Evaluation Criteria:

Your submission will be evaluated based on the following:

- **Requirement and Functionality Coverage:** How well all specified features are implemented.
- **Core Logic Implementation and Understanding:** The quality and correctness of the underlying logic for key functionalities.
- **Design Quality of Screens:** Adherence to wireframes and overall UI/UX quality.
- **Responsiveness and Mobile Optimization:** How well the application adapts to different screen sizes.
- **Routing between Pages:** Proper implementation of navigation.
- **Cross-Browser Functionality:** Ensuring the application works consistently across specified browsers.
- **Usage of Self-Implemented Components:** Preference for custom solutions over pre-built library components for core features.