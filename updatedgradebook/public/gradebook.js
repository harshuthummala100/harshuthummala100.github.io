
document.addEventListener('DOMContentLoaded', function() {
  Promise.any([
    fetch('/api/grades'),
    fetch('/grades')
  ])
    .then(function(res) {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then(function(rows) {
      const tbody = document.querySelector('#gradebook tbody');
      tbody.innerHTML = '';  

      rows.forEach(function(r) {
        const tr = document.createElement('tr');

        const tdName = document.createElement('td');
        tdName.textContent = `${r.last_name}, ${r.first_name}`;
        tr.appendChild(tdName);

        const tdGrade = document.createElement('td');
        tdGrade.textContent = Number(r.total_grade).toFixed(2);
        tr.appendChild(tdGrade);

        tbody.appendChild(tr);
      });
    })
    .catch(function(err) {
      console.error('Could not load grades →', err);
    });
});
