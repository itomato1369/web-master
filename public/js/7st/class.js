// class.js 

const obj = {
    name: 'Hong',
    age: 20,
    showInfo() {
        return `이름은 ${this.name}`;
    }
}; // 객체(하나의 값)

// 클래스 (실사물의 전산적 표현 => 객체(클래스))
class Person {
    // 이름, 키, 몸무게, 혈액형
    constructor(name, height, weight, bloodType) {
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.bloodType = bloodType;
    }
    showInfo() {
        return `이름은 ${this.name}, 키는 ${this.height} 입니다`;
    }
}

const p1 = new Person('Hong',178,72,'O'); // 인스턴스(실체) 생성
const p2 = new Person('park',180,80,'B');
console.log(p1.name, p2.bloodType, p1.showInfo());
console.log(p1.name, p2.height);
