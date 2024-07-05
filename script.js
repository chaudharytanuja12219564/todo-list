const inputbox = document.getElementById("input-box");
    const listcontainer = document.getElementById("list-container");
    const completedcounter = document.getElementById("completed-tasks");
    const uncompletedcounter = document.getElementById("incomplete-tasks");

    function updateCounter() {
      const completedTasks = document.querySelectorAll(".completed").length;
      const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;
      completedcounter.textContent = completedTasks;
      uncompletedcounter.textContent = uncompletedTasks;
    }

    function addTask() {
      const task = inputbox.value.trim();
      if (!task) {
        alert("Please write down a task");
        return;
      }
      const li = document.createElement("li");

      li.innerHTML = `
        <label>
          <input type="checkbox">
          <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
      `;

      listcontainer.appendChild(li);
      inputbox.value = "";

      // Get references to the elements
      const checkbox = li.querySelector("input");
      const editbtn = li.querySelector(".edit-btn");
      const deletebtn = li.querySelector(".delete-btn");
      const taskspan = li.querySelector("span");

      // Add event listeners
      checkbox.addEventListener("click", function() {
        li.classList.toggle("completed", checkbox.checked);
        updateCounter();
      });

      editbtn.addEventListener("click", function() {
        const update = prompt("Edit task:", taskspan.textContent);
        if (update !== null) {
          taskspan.textContent = update;
          li.classList.remove("completed");
          checkbox.checked = false;
          updateCounter();
        }
      });

      deletebtn.addEventListener("click", function() {
        if(confirm("Are you sure you want to delete the added task?")){
          li.remove();
          updateCounter();
        }
      });

    }