document.addEventListener("click", (event) => {
   const id = event.target.dataset.id;
   if (event.target.dataset.type === "remove") {
      remove(id).then(() => {
         event.target.closest("li").remove();
      });
   }
   if (event.target.dataset.type === "edit") {
      const newTitle = prompt("Enter a new title for the node");
      if (newTitle.trim()) {
         edit(id, newTitle).then(() => {
            event.target.closest("span").innerHTML = newTitle;
         });
      }
   }
});

async function edit(id, newTitle) {
   await fetch(`${id}/${newTitle}`, { method: "PUT" });
}

async function remove(id) {
   await fetch(`${id}`, { method: "DELETE" });
}
