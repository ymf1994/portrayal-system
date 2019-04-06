const relateTypeMap = {
  0: "与",
  1: "或",
  2: "非"
};
// 获取标签选择文本
export function getAllConditionText(arr = [], relateType = 0) {
  let allConditionTexts = [];
  arr.forEach(tag => {
    let conditionTexts = [];
    tag.condition.forEach(t => {
      let currentTagTexts = [];
      //填入标签名称
      currentTagTexts.push(t.tagName);
      // 填入map枚举
      if (t.mapKeyId != null) {
        currentTagTexts.push(t.mapKeyName);
      }
      // 填入级联枚举
      if (t.valueId != null && t.columnName) {
        currentTagTexts.push(t.valueName);
      }
      // 添加符号枚举
      if (t.symbolId != null) {
        currentTagTexts.push(t.symbolName);
      }
      // 添加具体值
      if (!t.columnName && t.valueName) {
        currentTagTexts.push(t.valueName || "");
      }
      conditionTexts.push(currentTagTexts.join(""));
    });
    let currentConditionRelation = relateTypeMap[relateType];
    allConditionTexts.push(conditionTexts.join(currentConditionRelation));
  });
  let allConditionRelation = relateTypeMap[relateType];
  let allConditionRelationText = allConditionTexts.join(allConditionRelation);
  return allConditionRelationText;
}
