const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      married: {
        type:Sequelize.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type:Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type:Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    }, {
      sequelize,
      timestamps: false, // 이것을 true로 하면 시퀄라이즈는 createdAt, updatedAt 칼럼을 추가한다.
      underscored: false, // 시퀄라이즈는 기본적으로 테이블명과 컬럼을 캐멀케이스로 설정한다. 이것을 스네이크 케이스로 바꾸는 옵션이다.
      modelName: 'User', // 모델 이름 설정 가능
      tableName: 'users', // 실제 데이터베이스의 테이블 이름이다.
      paranoid: false, // true로 서정하면 deletedAt이라는 칼럼이 생긴다. 로우 삭제시 완전히 지워지지 않고 지운 시간이 기록된다.
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  } // init 메서드에는 테이블에 대한 설정을 한다. 첫번째 인수는 테이블 컬럼에 대한 설정이고 두번째 인수는 테이블 자체에 대한 설정이다.
  static associate(db) {
    db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
  }
  // associate 메서드에는 다른 모델과의 관계를 적는다.
};