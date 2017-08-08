
//service status map
const MAP_PAID_STATUS ={
   'U':   'unpaid',
   'P':     'paid',
   'W': 'underway',
   'R':   'refund',
   'F': 'finished',
};

//handle immutable data to plain object
const handleServiceData = (data, kind) => {
  let dataSource = [];
 
  data.map((item) => {
    if (MAP_PAID_STATUS[item.get('status')] === kind) {
      let data = {
          service_object: {
            patient: {
              
            }
          }
        };
        item.mapEntries(([key, value]) => {
          if (key === 'service_object') {
            value.mapEntries(([key, value]) => {
              if (key === 'patient') {
                value.mapEntries(([key, value]) => {
                    data['service_object']['patient'][key] = value;
                })
              } else {
                data['service_object'][key] = value;
              }
            })
          } else {
            data[key] = value;
          }
      })
      data['key'] = item.get('order_no');
      dataSource.push(data);
    }
  })

  return dataSource;
}

const ITEMS = [
  'newOrderData',
  'underGoingData',
  'finishedData',
];


export {
  handleServiceData,
  ITEMS,
}