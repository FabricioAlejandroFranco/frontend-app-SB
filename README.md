# Articles Filter Frontend

This is a React frontend application that fetches and filters articles based on title length and user-defined sorting criteria. It also logs user actions (filter selections) in local storage.

## Features

- Fetch articles from a local API.
- Filter articles based on the number of words in the title:
  - Filter by titles with more than 5 words, ordered by the number of comments.
  - Filter by titles with 5 or fewer words, ordered by points.
- Log user actions (filter selections) and persist them in local storage.
- Reset filters.

## Technologies Used

- **React**: For building the UI components.
- **Axios**: For making HTTP requests to fetch article data.
- **Local Storage**: For persisting user logs across sessions.
- **JavaScript (ES6)**: Core programming language used.
- **CSS**: For styling components.

## Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm**: (Comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/FabricioAlejandroFranco/frontend-app-SB.git
   cd /react
   ```

2. Install the dependencies:
   npm install

### Future Improvements {once I land the job and electrical power ;-)}

Add pagination for articles.
Improve error handling when fetching data.
Add sorting options for other article fields.
Implement unit testing.
