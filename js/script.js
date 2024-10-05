const handleSearch = () => {
  document.getElementById("spinner").style.display = "block";
  const searchBox = document.getElementById("search-box").value;

  setTimeout(function () {
    loadPhone(false, searchBox);
  }, 2000);
};

const loadPhone = async (status, searchBox) => {
  document.getElementById("spinner").style.display = "none";
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      searchBox ? searchBox : "iphone"
    }`
  );
  const data = await response.json();
//   console.log(data);
  if (status) {
    displayAllPhone(data.data);
  } else {
    displayAllPhone(data.data.slice(0, 6));
  }
};
const displayAllPhone = (phones) => {
  const phonesContainer = document.getElementById("phones-container");
  //    its a impotant section
  document.getElementById("phones-container").innerHTML = "";
  phones.forEach((phone) => {
    const { brand, image, slug } = phone;
    // console.log(phone);
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card card-compact mt-5 space-y-4 shadow-xl">
        <figure>
           <img src="${image}" alt="" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${brand}</h2>
            <p>${slug}</p>
            <div class="card-actions">
            <button onclick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        </div>
    
    `;
    phonesContainer.append(div);
  });
};
async function phoneDetails(slugs) {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slugs}`
  );
  const data = await res.json();
  const { brand,image,name,slug,releaseDate
  } = data.data


  const modalContainer = document.getElementById('modal-container')
  modalContainer.innerHTML =`
    <!-- Open the modal using ID.showModal() method -->
    <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">${brand}</h3>
        <p class="py-4">${name}</p>
        <p class="py-4">${releaseDate}</p>
        <div class="modal-action">
        <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-primary">Close</button>
        </form>
        </div>
    </div>
    </dialog>
  `
  my_modal_1.showModal()
}

const handleShowAll = () => {
  loadPhone(true);
};
loadPhone(false);
