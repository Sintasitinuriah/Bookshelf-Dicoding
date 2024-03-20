let data = [];
function add() {
    const inputBookElement = document.querySelector(".input_section");
    const editBookElement = document.querySelector(".input_section_edit");
    const addDivElement = document.querySelector(".add_div");

    if (inputBookElement) {
        inputBookElement.style.display = "block";
    } else {
        console.error("Element with class 'inputBook' not found.");
    }

    if (addDivElement) {
        addDivElement.style.display = "none";
    } else {
        console.error("Element with class 'add_div' not found.");
    }

    if (addDivElement) {
        editBookElement.style.display = "none";
    } else {
        console.error("Element with class 'add_div' not found.");
    }
}

function addData(t) {
    t.preventDefault();
    const judul = document.querySelector("#inputBookTitle"),
        penulis = document.querySelector("#inputBookAuthor"),
        tahun = document.querySelector("#inputBookYear"),
        iscom = document.querySelector("#inputBookIsComplete"),
        c = { id: +new Date, title: judul.value, author: penulis.value, year: Number(tahun.value), isComplete: iscom.checked };
    console.log(c),
        data.push(c),
        document.dispatchEvent(new Event("bookChanged"))
        document.querySelector(".input_section").style.display = "none";
        document.querySelector(".input_section_edit").style.display = "none";
        document.querySelector(".add_div").style.display = "block";
}
function searchData(event) {
    event.preventDefault();

    const searchInput = document.querySelector("#searchBookTitle");
    const query = searchInput.value.toLowerCase();

    if (query) {
        const filteredData = data.filter(book => book.title.toLowerCase().includes(query));
        event(filteredData);
    } else {
        event(data);
    }
}

function findData1(t) {
    const setData = Number(t.target.id),
        objek = data.findIndex((function (data) { return data.id === setData }));
    -1 !== objek && (data[objek] = { ...data[objek], isComplete: !0 },
        document.dispatchEvent(new Event("bookChanged")))
}
function findData2(t) {
    const setData = Number(t.target.id),
        objek = data.findIndex((function (data) {
            return data.id === setData
        }));
    -1 !== objek && (data[objek] = { ...data[objek], isComplete: !1 },
        document.dispatchEvent(new Event("bookChanged")))
}
function deleteData(t) {
    const setData = Number(t.target.id),
        objek = data.findIndex((function (data) {
            return data.id === setData
        }));

    if (objek !== -1) {
        const userConfirmed = confirm("Apakah kamu yakin menghapus buku ini?");
        if (userConfirmed) {
            data.splice(objek, 1);
            document.dispatchEvent(new Event("bookChanged"));
            alert("Buku berhasil dihapus!");
        } else {
            alert("Hapus buku dibatalkan.");
        }
    }
}

// Assuming you have an HTML form with the id "editBookForm" containing input fields for editing
function editData(event) {
    event.preventDefault();
    document.querySelector(".input_section").style.display = "none";
    document.querySelector(".input_section_edit").style.display = "block";
    document.querySelector(".add_div").style.display = "none";
    console.log(data);

    const setData = Number(event.target.id),
        objek = data.findIndex((function (data) {
            return data.id === setData
        }));
    if (objek !== -1) {
        const selectedBook = data[objek];
      
        document.querySelector("#editBookTitle").value = selectedBook.title;
        document.querySelector("#editBookAuthor").value = selectedBook.author;
        document.querySelector("#editBookYear").value = selectedBook.year;
        document.querySelector("#editBookIsComplete").checked = selectedBook.isComplete;
      } else {
        console.log(`Buku dengan ID ${event} tidak ditemukan.`);
    }
}


function activity(data) {
    const belumselesai = document.querySelector("#incompleteBookshelfList"),
        selesai = document.querySelector("#completeBookshelfList");
    belumselesai.innerHTML = "",
        selesai.innerHTML = "";
    for (const c of data) {
        const data = document.createElement("article");
        data.classList.add("book_item");
        const judul = document.createElement("h2");
        judul.innerText = c.title;
        const penulis = document.createElement("p");
        penulis.innerText = "Penulis: " + c.author;
        const tahun = document.createElement("p");
        if (tahun.innerText = "Tahun: " + c.year, data.appendChild(judul), data.appendChild(penulis), data.appendChild(tahun), c.isComplete) {
            const aksi = document.createElement("div");
            aksi.classList.add("action");
            const btn1 = document.createElement("button");
            btn1.id = c.id, btn1.innerText = "Belum Selesai dibaca",
                btn1.classList.add("blue"),
                btn1.addEventListener("click", findData2);
            const btn2 = document.createElement("button");
            btn2.id = c.id,
                btn2.innerText = "Hapus",
                btn2.classList.add("red"),
                btn2.addEventListener("click", deleteData, false);
            const btn3 = document.createElement("button");
            btn3.id = c.id, btn3.innerText = "Edit",
                btn3.classList.add("green"),
                btn3.addEventListener("click", editData);
                aksi.appendChild(btn1);
                aksi.appendChild(btn2);
                aksi.appendChild(btn3),
                data.appendChild(aksi);
                selesai.appendChild(data);
        } else {
            const aksi = document.createElement("div");
            aksi.classList.add("action");
            const btn1 = document.createElement("button");
            btn1.id = c.id, btn1.innerText = "Selesai dibaca",
                btn1.classList.add("blue"),
                btn1.addEventListener("click", findData1);
            const btn2 = document.createElement("button");
            btn2.id = c.id, btn2.innerText = "Hapus",
                btn2.classList.add("red");
                btn2.addEventListener("click", deleteData);
            const btn3 = document.createElement("button");
            btn3.id = c.id, btn3.innerText = "Edit",
                btn3.classList.add("green"),
                btn3.addEventListener("click", editData);
                aksi.appendChild(btn1),
                aksi.appendChild(btn2),
                aksi.appendChild(btn3),
                data.appendChild(aksi),
                belumselesai.appendChild(data)
        }
    }
}
function cache() {
    !function (data) {
        localStorage.setItem("books", JSON.stringify(data))
    }
        (data), activity(data)
}
window.addEventListener("load", (function () {
    data = JSON.parse(localStorage.getItem("books")) || [], activity(data);
    const o = document.querySelector("#inputBook");
        // d = document.querySelector("#searchBook");
    o.addEventListener("submit", addData),
        // d.addEventListener("submit", searchData),
        document.addEventListener("bookChanged", cache)
}))

// (() => {
//     let data = [];
//     function addData(t) {
//         t.preventDefault();
//         const judul = document.querySelector("#inputBookTitle"),
//             penulis = document.querySelector("#inputBookAuthor"),
//             tahun = document.querySelector("#inputBookYear"),
//             iscom = document.querySelector("#inputBookIsComplete"),
//             c = { id: +new Date, title: judul.value, author: penulis.value, year: tahun.value, isComplete: iscom.checked };
//         console.log(c),
//             data.push(c),
//             document.dispatchEvent(new Event("bookChanged"))
//     }
//     function searchData(event) {
//         event.preventDefault();
    
//         const searchInput = document.querySelector("#searchBookTitle");
//         const query = searchInput.value.toLowerCase();
    
//         if (query) {
//             const filteredData = data.filter(book => book.title.toLowerCase().includes(query));
//             event(filteredData);
//         } else {
//             event(data);
//         }
//     }

//     function findData1(t) {
//         const setData = Number(t.target.id),
//             objek = data.findIndex((function (data) { return data.id === setData }));
//         -1 !== objek && (data[objek] = { ...data[objek], isComplete: !0 },
//             document.dispatchEvent(new Event("bookChanged")))
//     }
//     function findData2(t) {
//         const setData = Number(t.target.id),
//             objek = data.findIndex((function (data) {
//                 return data.id === setData
//             }));
//         -1 !== objek && (data[objek] = { ...data[objek], isComplete: !1 },
//             document.dispatchEvent(new Event("bookChanged")))
//     }
//     function deleteData(t) {
//         const setData = Number(t.target.id),
//             objek = data.findIndex((function (data) {
//                 return data.id === setData
//             }));
    
//         if (objek !== -1) {
//             const userConfirmed = confirm("Apakah kamu yakin menghapus buku ini?");
//             if (userConfirmed) {
//                 data.splice(objek, 1);
//                 document.dispatchEvent(new Event("bookChanged"));
//                 alert("Buku berhasil dihapus!");
//             } else {
//                 alert("Hapus buku dibatalkan.");
//             }
//         }
//     }
    
//     // Assuming you have an HTML form with the id "editBookForm" containing input fields for editing
//     function editData(event) {
//         event.preventDefault();

//         // Retrieve values from the edit form
//         const editJudul= document.querySelector("#inputBookTitle").value;
//         const editPenulis = document.querySelector("#inputBookAuthor").value;
//         const editTahun = document.querySelector("#inputBookYear").value;
//         const editIsComplete = document.querySelector("#inputBookIsComplete").checked;

//         const setData = Number(event.target.id),
//             objek = data.findIndex((function (data) {
//                 return data.id === setData
//             }));

//         if (objek !== -1) {
//             // Update the existing data with the edited values
//             data[objek].judul= editJudul;
//             data[objek].penulis = editPenulis;
//             data[objek].tahun = editTahun;
//             data[objek].iscom = editIsComplete;

//             // Trigger a custom event to indicate that the book has been edited
//             document.dispatchEvent(new Event("bookChanged"));

//             // Display a success message (you can customize this part)
//             alert("Book edited successfully!");
//         } else {
//             // Display an error message if the book with the specified ID is not found
//             alert("Book not found. Edit failed.");
//         }
//     }

    
//     function activity(data) {
//         const belumselesai = document.querySelector("#incompleteBookshelfList"),
//             selesai = document.querySelector("#completeBookshelfList");
//         belumselesai.innerHTML = "",
//             selesai.innerHTML = "";
//         for (const c of data) {
//             const data = document.createElement("article");
//             data.classList.add("book_item");
//             const judul = document.createElement("h2");
//             judul.innerText = c.title;
//             const penulis = document.createElement("p");
//             penulis.innerText = "Penulis: " + c.author;
//             const tahun = document.createElement("p");
//             if (tahun.innerText = "Tahun: " + c.year, data.appendChild(judul), data.appendChild(penulis), data.appendChild(tahun), c.isComplete) {
//                 const aksi = document.createElement("div");
//                 aksi.classList.add("action");
//                 const btn1 = document.createElement("button");
//                 btn1.id = c.id, btn1.innerText = "Belum Selesai dibaca",
//                     btn1.classList.add("blue"),
//                     btn1.addEventListener("click", findData2);
//                 const btn2 = document.createElement("button");
//                 btn2.id = c.id,
//                     btn2.innerText = "Hapus",
//                     btn2.classList.add("red"),
//                     btn2.addEventListener("click", deleteData2, false);
//                 const btn3 = document.createElement("button");
//                 btn3.id = c.id, btn3.innerText = "Edit",
//                     btn3.classList.add("green"),
//                     btn3.addEventListener("click", editData);
//                     aksi.appendChild(btn1);
//                     aksi.appendChild(btn2);
//                     aksi.appendChild(btn3),
//                     data.appendChild(aksi);
//                     selesai.appendChild(data);
//             } else {
//                 const aksi = document.createElement("div");
//                 aksi.classList.add("action");
//                 const btn1 = document.createElement("button");
//                 btn1.id = c.id, btn1.innerText = "Selesai dibaca",
//                     btn1.classList.add("blue"),
//                     btn1.addEventListener("click", findData1);
//                 const btn2 = document.createElement("button");
//                 btn2.id = c.id, btn2.innerText = "Hapus",
//                     btn2.classList.add("red");
//                     btn2.addEventListener("click", deleteData);
//                 const btn3 = document.createElement("button");
//                 btn3.id = c.id, btn3.innerText = "Edit",
//                     btn3.classList.add("green"),
//                     btn3.addEventListener("click", editData);
//                     aksi.appendChild(btn1),
//                     aksi.appendChild(btn2),
//                     aksi.appendChild(btn3),
//                     data.appendChild(aksi),
//                     belumselesai.appendChild(data)
//             }
//         }
//     }
//     function cache() {
//         !function (data) {
//             localStorage.setItem("books", JSON.stringify(data))
//         }
//             (data), activity(data)
//     }
//     window.addEventListener("load", (function () {
//         data = JSON.parse(localStorage.getItem("books")) || [], activity(data);
//         const o = document.querySelector("#inputBook"),
//             d = document.querySelector("#searchBook");
//         o.addEventListener("submit", addData),
//             d.addEventListener("submit", searchData),
//             document.addEventListener("bookChanged", cache)
//     }))
// })();
