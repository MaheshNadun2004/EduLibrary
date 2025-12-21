const gradePoints = {
  "A+": 4.0,"A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D": 1.0, "F": 0.0
};

const coursesEl = document.getElementById("courses");
const addBtn = document.getElementById("addBtn");
const resetBtn = document.getElementById("resetBtn");
const gpaEl = document.getElementById("gpa");
const totalCreditsEl = document.getElementById("totalCredits");


function addRow(code = "", credits = "", grade = "A") {
  const row = document.createElement("div");
  row.className = "row";

  const codeInput = document.createElement("input");
  codeInput.className = "input";
  codeInput.placeholder = "CS101";
  codeInput.value = code;

  const creditsInput = document.createElement("input");
  creditsInput.className = "input";
  creditsInput.type = "number";
  creditsInput.min = "0";
  creditsInput.step = "0.5";
  creditsInput.placeholder = "3";
  creditsInput.value = credits;

  const gradeSelect = document.createElement("select");
  gradeSelect.className = "select";
  Object.keys(gradePoints).forEach(g => {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = g;
    if (g === grade) opt.selected = true;
    gradeSelect.appendChild(opt);
  });

  const delBtn = document.createElement("button");
  delBtn.className = "del";
  delBtn.textContent = "✕";
  delBtn.title = "Delete row";

 
  coursesEl.appendChild(codeInput);
  coursesEl.appendChild(creditsInput);
  coursesEl.appendChild(gradeSelect);
  coursesEl.appendChild(delBtn);

  
  [codeInput, creditsInput, gradeSelect].forEach(el =>
    el.addEventListener("input", updateGPA)
  );
  delBtn.addEventListener("click", () => {
    codeInput.remove();
    creditsInput.remove();
    gradeSelect.remove();
    delBtn.remove();
    updateGPA();
  });

  updateGPA();
}


function updateGPA() {
  const children = Array.from(coursesEl.children).slice(4); // skip header cells
  let totalCredits = 0;
  let totalWeighted = 0;

  for (let i = 0; i < children.length; i += 4) {
    const codeInput = children[i];
    const creditsInput = children[i + 1];
    const gradeSelect = children[i + 2];

    const credits = parseFloat(creditsInput.value);
    const grade = gradeSelect.value;

    if (!isNaN(credits) && credits > 0 && gradePoints[grade] !== undefined) {
      totalCredits += credits;
      totalWeighted += credits * gradePoints[grade];
    }
  }

  const gpa = totalCredits > 0 ? (totalWeighted / totalCredits) : 0;
  gpaEl.textContent = gpa.toFixed(2);
  totalCreditsEl.textContent = totalCredits.toFixed(1);
}


function resetAll() {

  const children = Array.from(coursesEl.children).slice(4);
  children.forEach(el => el.remove());

 
  addRow("CS101", 3, "A-");
  addRow("MA102", 2, "B+");
  updateGPA();
}


addBtn.addEventListener("click", () => addRow());
resetBtn.addEventListener("click", resetAll);


resetAll();
