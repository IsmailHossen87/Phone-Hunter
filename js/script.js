const handleSearch = () =>{
document.getElementById('spinner').style.display='block'
const searchBox= document.getElementById('search-box').value;

   setTimeout(function () {
    loadPhone(false,searchBox)
   }, 2000);
}

const loadPhone = async(status ,searchBox) =>{
    document.getElementById('spinner').style.display='none'
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchBox?searchBox:'iphone'}`)
    const data = await response.json();
    console.log(data)
    if(status){
        displayAllPhone(data.data)
    }else{
        displayAllPhone(data.data.slice(0,6))
    }
}
const displayAllPhone = (phones) =>{
   const phonesContainer = document.getElementById('phones-container')
//    its a impotant section
   document.getElementById('phones-container').innerHTML =''
phones.forEach(phone => {
    const {brand ,image,slug}= phone
    console.log(phone)
    const div = document.createElement('div')
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
    
    `
    phonesContainer.append(div)
});

 async function phoneDetails(slug) {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    const data = await res.json()
    console.log(data)



    // const modalContainer = document.createElement('div')
    // modalContainer.innerHTML =`
    // <!-- Open the modal using ID.showModal() method -->
    //     <button class="btn" onclick="my_modal_2.showModal()">open modal</button>
    //     <dialog id="my_modal_2" class="modal">
    //     <div class="modal-box">
    //         <h3 class="text-lg font-bold">Hello!</h3>
    //         <p class="py-4">Press ESC key or click outside to close</p>
    //     </div>
    //     <form method="dialog" class="modal-backdrop">
    //         <button>close</button>
    //     </form>
    //     </dialog>
    // `
}


}
const handleShowAll = ()=> {
    loadPhone(true)
}
loadPhone(false)