const handleQuestion = (item) => ({
  key: item.get('id'),
  answer_num: item.get('answer_num'),
  title: item.get('title'),
  id: item.get('id'),
  solved: item.get('solved'),
  stars: item.get('stars'),
  department: item.get('department'),
  body: item.get('body'),
});

const sortMap = {
  '默认排序': 'default',
  '关注数最多': 'stars',
  '回答数最多': 'answer_num',
};

const handleQuestions = (data, dep, sort) => {
  let dataSource = [];

  data.map((item) => {
    dataSource.push(
      handleQuestion(item),
    )
  });

  return dataSource;
}





export {
  handleQuestions,
  handleQuestion,
}