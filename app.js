const todos = [];
let editIndex = null;

function todoTableRender() {
  let html = "";

  if (todos.length > 0) {
    for (const [i, todo] of todos.entries()) {
      html += `<tr id="todo-${i}" data-index="${i}">
        <th scope="row">${i + 1}</th>
        <td>${todo.todo}</td>
        <td>${todo.status}</td><td>`;
      if (todo.status == "In progress") {
        html += `<a href="javascript:void(0)" class="text-success complete-todo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-thumbs-up"
            >
              <path
                d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
              ></path>
            </svg>
          </a>`;
      } else {
        html += `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-thumbs-down in-progress-todo text-primary"
      >
        <path
          d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
        ></path>
      </svg>
        `;
      }

      html += `
      <a href="javascript:void(0)" class="text-warning edit-todo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-edit"
        >
          <path
            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
          ></path>
          <path
            d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
          ></path>
        </svg>
      </a>
      <a href="javascript:void(0)" class="text-danger del-todo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-trash-2"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path
            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
          ></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </a>
    </td>
    </tr>
    `;
    }
  } else {
    html += ` <tr>
    <td colspan="4" class="text-center">No data found</td>
  </tr>`;
  }

  $("#todo-render").html(html);
}

function todoValidation(form) {
  const todo = $(form).find('input[name="todo"]');
  const todoInvalid = $(form).find("#todo-invalid");

  if (todo.val() == "") {
    if (!todo.hasClass("is-invalid")) {
      todo.addClass("is-invalid");
    }

    if (todoInvalid.hasClass("d-none")) {
      todoInvalid.removeClass("d-none");
    }

    return false;
  }

  todo.removeClass("is-invalid");
  todoInvalid.addClass("d-none");
  return todo.val();
}

$("#todo-form").submit(function (e) {
  e.preventDefault();
  const todo = todoValidation(this);

  if (todo) {
    if (editIndex == null) {
      todos.unshift({
        todo: todo,
        status: "In progress",
      });
    } else {
      todos[editIndex].todo = todo;
      todos[editIndex].status = "In progress";
    }

    editIndex = null;
    $(this).trigger("reset");
    todoTableRender();
  }
});

$(document).on("click", ".edit-todo", function (e) {
  e.preventDefault();
  const tr = $(this).closest("tr");
  editIndex = tr.data("index");

  $('input[name="todo"]').val(todos[editIndex].todo);
});

$(document).on("click", ".del-todo", function (e) {
  e.preventDefault();

  const confirmation = confirm("Are you sure to delete?");

  if (confirmation) {
    const tr = $(this).closest("tr");
    const index = tr.data("index");
    todos.splice(index, 1);
    todoTableRender();
  }
});

$(document).on("click", ".complete-todo", function (e) {
  e.preventDefault();

  const tr = $(this).closest("tr");
  const index = tr.data("index");
  todos[index].status = "Complete";
  todoTableRender();
});

$(document).on("click", ".in-progress-todo", function (e) {
  e.preventDefault();

  const tr = $(this).closest("tr");
  const index = tr.data("index");
  todos[index].status = "In progress";
  todoTableRender();
});
