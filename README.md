# Flappy Plane

![Flappy Plane](/public/flappy-plane.png)

Flappy Plane is a gesture-controlled game built with **React** and **Tailwind CSS**, leveraging **ml5.js** for gesture recognition.  
Players control the plane using hand gestures detected via their webcam.

<br>

## 🎮 Features

- Gesture-based controls using ml5.js (`<script src="https://unpkg.com/ml5@1.0.1/dist/ml5.min.js"></script>`)  
- Smooth gameplay built with React + Tailwind  
- Open source and ready for contributions  

<br>


## 📝 Contribution Guidelines

We maintain a **2-branch workflow**:
- `main` → stable release branch
- `dev` → all contributions happen here first

### How to contribute:

1. **Fork** the repository.

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/Galib-23/flappy-plane.git
   cd flappy-plane
   ```

3. **Set upstream** to keep your fork updated:
   ```bash
   git remote add upstream https://github.com/Galib-23/flappy-plane.git
   ```

4. **Create a branch** from dev:
   ```bash
   git fetch upstream
   git checkout dev
   git pull upstream dev
   git checkout -b my-feature
   ```

5. **Make changes** → commit:
   ```bash
   git add .
   git commit -m "feat: describe your change"
   ```

6. **Keep branch updated** before pushing:
   ```bash
   git fetch upstream
   git pull upstream dev
   ```

7. **Push** to your fork:
   ```bash
   git push origin my-feature
   ```

8. **Open a Pull Request** on GitHub:
   - Base: `dev` (original repo)
   - Compare: `my-feature` (your fork)

9. **Wait for review** → Once approved, it will be merged into `dev`.

10. Periodically, `dev` is merged into `main` for stable releases.

⚠️ **Never push directly to `main`. All work should go through `dev`.**

<br>

## 🧠 How ml5 is used

The game uses **ml5.js** for gesture recognition:

```html
<script src="https://unpkg.com/ml5@1.0.1/dist/ml5.min.js"></script>
```

- Detects hand gestures from webcam feed
- Converts gestures into plane movements (e.g., up/down)
- Enables intuitive, touchless gameplay

## 📄 License

This project is licensed under the **MIT License**. See LICENSE for details.