
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
          patient: {

          }
        };
        item.mapEntries(([key, value]) => {
          if (key === 'patient') {
            value.mapEntries(([key, value]) => {
              data['patient'][key] = value;
            })
          } else {
            data[key] = value;
          }
      })
      data['key'] = item.get('id');
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