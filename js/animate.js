/**
 * Created by ���� on 2017/7/10.
 */

//��װanimate����
//��timerId��Ϊ��������ԣ��Ǹ�divҪ�ƶ����Ǹ�div�ļ�ʱ��id�ͱ������Լ��������
function animate(obj,target){
  clearInterval(obj.timerId);
  obj.timerId = setInterval(function () {
    var currentLeft = obj.offsetLeft;
    var step = currentLeft < target?10:-10;
    currentLeft += step;
    //���Ŀ��λ�ú͵�ǰλ��֮��ľ��룬С��һ����������ֱ�Ӹ�Ŀ��ֵ��
    //���Ŀ��λ�ú͵�ǰλ��֮��ľ��룬���ڵ���һ������������һ����
    if(Math.abs(target-currentLeft) < Math.abs(step)){
      clearInterval(obj.timerId);
      obj.style.left = target+"px";
    }else {
      obj.style.left = currentLeft+"px";
    }
    //console.log("1");
  },30);
}