import React from 'react'

const LocationSearchPanel = (props) => {
     
    const locations=[
         	"No. 8-2-120/112, 1st Floor, Park View Estate, Road No. 2, Banjara Hills, Hyderabad, Telangana 500034, India",
            " 	Plot No.66, Rd Number 1, Park View Enclave, Jubilee Hills, Hyderabad, Telangana 500033, India",
            "4th Floor, Fortune Atrium, Road No. 36, Jubilee Hills, opp. Chutneys, Hyderabad, Telangana 500033, India",
            " 	12-13-1260, 1st Floor, Opp.Innova Hospital, Street Number 7, above Krishna Jewellers, Tarnaka, Hyderabad, Telangana 500017, India",
            "Plot No.2, 1st floor, Krutika Layout Honda Showroom, Hitech City Rd, opp. Pride, Madhapur, Hyderabad, Telangana 500081, India",
    ]

  return (
    <div className='overflow-scroll' >
        {locations.map((location) => {
            return (
                <div key={location.id}>
                    <div onClick={()=>{
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }}  className='flex items-center mb-2 gap-4 active:border-black  border-2 p-3 rounded-xl  border-gray-200 ac justify-start'>
                        <h2 className='bg-[#eee] p-2 rounded-full h-8 w-12 flex  items-center justify-center  '><i className="ri-map-pin-line"></i></h2>
                        <h5 className='text-sm'>{location}</h5>
                    </div>
                </div>
                
            );
        })}
         
        
         
        
         
    </div>
  )
}

export default LocationSearchPanel
