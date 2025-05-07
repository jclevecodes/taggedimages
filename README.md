https://ctec-450-cleveland.vercel.app/index.html

# Tagged Images Demo

A lightweight proof-of-concept web application demonstrating full-stack development and AWS serverless integration. Users can upload images via a React frontend; the image is processed by an AWS Lambda function that uploads it to S3, analyzes it with Amazon Rekognition, and returns descriptive labels.

---

## Features

* **Image Upload:** Client-side image selection and upload from React UI.
* **Serverless Backend:** AWS Lambda handles image storage and analysis.
* **Image Storage:** Uploaded images stored in Amazon S3.
* **Image Analysis:** Automatic label detection with AWS Rekognition.
* **API Gateway:** RESTful endpoint connecting frontend and Lambda.

---

## Architecture Overview

```text
React App  --->  API Gateway  --->  Lambda Function  --->  S3 & Rekognition
      ^             |                 |                   |
      |             v                 v                   v
   Browser       HTTP POST        Node.js handler    Stored images & labels
```

1. **React Frontend:** Uploads base64-encoded image to API Gateway.
2. **API Gateway:** Routes POST requests to the Lambda function.
3. **AWS Lambda:** Uploads image to S3, calls Rekognition, returns labels.
4. **Amazon S3:** Stores raw images.
5. **Amazon Rekognition:** Detects labels in stored images.

---

## Prerequisites

* **AWS Account** with permissions to create and manage S3, Lambda, IAM, and API Gateway.
* **Node.js & npm** installed locally.
* **Git** for version control and GitHub integration.

---

## Setup & Configuration

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/aws-image-upload-demo.git
   cd aws-image-upload-demo
   ```

2. **Frontend Configuration**

   * Navigate to the React app directory:

     ```bash
     cd frontend
     ```
   * Install dependencies:

     ```bash
     npm install
     ```

3. **AWS S3 Bucket**

   * Create an S3 bucket (e.g., `your-unique-bucket-name`).
   * In the bucket, create a folder named `uploads/` (optional).

4. **IAM Role for Lambda**

   * Create a new IAM role named `LambdaImageUploadRole`.
   * Attach a custom policy allowing:

     ```json
     {
       "Effect": "Allow",
       "Action": ["s3:PutObject"],
       "Resource": "arn:aws:s3:::your-unique-bucket-name/uploads/*"
     },
     {
       "Effect": "Allow",
       "Action": ["rekognition:DetectLabels"],
       "Resource": "*"
     }
     ```

5. **Lambda Function Deployment**

   * Zip the handler code:

     ```bash
     zip function.zip index.js
     ```
   * In AWS Lambda console, create a function named `ImageUploadProcessor`:

     * Runtime: Node.js 14.x or later
     * Execution role: `LambdaImageUploadRole`
   * Upload `function.zip` and click **Deploy**.

6. **API Gateway Setup**

   * Create a new REST API (`ImageUploadAPI`).
   * Add resource `/upload` with a **POST** method.
   * Integration type: Lambda Proxy, function: `ImageUploadProcessor`.
   * Enable CORS on the POST method.
   * Deploy to stage `dev` and note the Invoke URL.

7. **Environment Variables**

   * In the React app (`frontend`), update `src/App.js`:

     ```js
     const API_URL = "https://{api-id}.execute-api.{region}.amazonaws.com/dev/upload";
     ```

---

## Running the Project Locally

1. **Start React App**

   ```bash
   cd frontend
   npm start
   ```
2. **Upload & Analyze**

   * Open `http://localhost:3000` in your browser.
   * Select an image file and click **Upload and Analyze**.
   * View detected labels in the UI.

---

## CI/CD Integration (Optional)

* **GitHub Actions**: Automate linting, testing, and building the frontend on each push to `main`.
* **AWS CLI**: Deploy Lambda and API Gateway updates via scripts.

---

## Troubleshooting

* **Handler Errors**: Check CloudWatch Logs for detailed stack traces.
* **CORS Issues**: Verify CORS settings in API Gateway.
* **Permissions**: Ensure the IAM role has correct S3 and Rekognition actions.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Contact

For questions or feedback, open an issue or reach out to `your-email@example.com`.
