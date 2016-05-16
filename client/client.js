var app = angular.module("app", []);

app.controller("MainController", ["$scope", "$http", function($scope, $http) {

  //nav
    $scope.homeHide = true;
    $scope.studentHide = false;
    $scope.programHide = false;
    $scope.salesHide = false;
    $scope.showHome = function(){
      $scope.homeHide = !$scope.homeHide;
      if($scope.studentHide === true){
        $scope.studentHide = !$scope.studentHide
      }
       if($scope.programHide === true){
        $scope.programHide = !$scope.programHide
      }
      if($scope.salesHide === true){
        $scope.salesHide = !$scope.salesHide
      }
    }
    $scope.showStudents = function(){
      $scope.studentHide = !$scope.studentHide;
      if($scope.homeHide === true){
          $scope.homeHide = !$scope.homeHide
      }
       if($scope.programHide === true){
        $scope.programHide = !$scope.programHide
      }
      if($scope.salesHide === true){
        $scope.salesHide = !$scope.salesHide
      }
    }
    $scope.showPrograms = function(){
      $scope.programHide = !$scope.programHide;
      if($scope.homeHide === true){
          $scope.homeHide = !$scope.homeHide
      }
       if($scope.studentHide === true){
        $scope.studentHide = !$scope.studentHide
      }
      if($scope.salesHide === true){
        $scope.salesHide = !$scope.salesHide
      }
    }
    $scope.showSales = function(){
      $scope.salesHide = !$scope.salesHide;
      if($scope.homeHide === true){
          $scope.homeHide = !$scope.homeHide
      }
       if($scope.studentHide === true){
        $scope.studentHide = !$scope.studentHide
      }
      if($scope.programHide === true){
        $scope.programHide = !$scope.programHide
      }
    }

  //students
  $scope.studentArray = [];
  $scope.studentObject = {};
  $scope.edit = false;
  $scope.toggle = true;
  $scope.count = 0;
  $scope.getStudents = function() {
    $http.get("/student").then(function(response) {
      $scope.studentObject = {};
      $scope.studentArray = response.data;
    });
  };
  $scope.getStudents();
  $scope.add = function(student){
    $http.post('/add', student).then($scope.getStudents());
    
  }
  $scope.change = function(student){
    $scope.count++;
    if($scope.count%2===0){
    $http.put('/change/' + student._id, student);
  }
  }
  $scope.deleteStudent = function(student) {
    var result = confirm("Are you sure you want to delete this student? This cannot be reversed.");
    if (result){
      $http.delete("/deleteStudent/" + student._id).then(function(response) {
        $scope.getStudents();
        console.log("Deleted");
      });
    }
  };
  //first program page
  $scope.currentRank = "";
  $scope.rank = "";
  $scope.goal = "";
  $scope.totalMonths = "";
  $scope.firstProgramForm = true;
  $scope.secondProgramForm = false;
  $scope.firstNext = function(){
    $scope.firstProgramForm = !$scope.firstProgramForm;
    $scope.secondProgramForm = !$scope.secondProgramForm;
  }
  //second program page
  $scope.tuition = "";
  $scope.familyDiscount = "";
  $scope.earlyEnroll = "";
  $scope.thirdProgramForm = false;
  $scope.secondNext = function(){
    $scope.tuition = Number($scope.tuition);
    $scope.familyDiscount = Number($scope.familyDiscount);
    $scope.earlyEnroll = Number($scope.earlyEnroll);
    $scope.totalTuition = Number($scope.totalTuition);
    $scope.totalTuition = Math.round(($scope.tuition - ($scope.tuition * $scope.familyDiscount) - $scope.earlyEnroll)*100)/100;
    $scope.secondProgramForm = !$scope.secondProgramForm;
    $scope.thirdProgramForm = !$scope.thirdProgramForm;
  }
  //third program page
  $scope.uniform = "";
  $scope.equipment = "";
  $scope.promotion = "";
  $scope.fourthProgramForm = false;
  $scope.thirdNext = function(){
    $scope.uniform = Number($scope.uniform);
    $scope.equipment = Number($scope.equipment);
    $scope.promotion = Number($scope.promotion);
    $scope.totalPackage = Math.round(($scope.uniform + $scope.equipment + $scope.promotion)*100)/100;
    $scope.thirdProgramForm = !$scope.thirdProgramForm;
    $scope.fourthProgramForm = !$scope.fourthProgramForm;
  }
  //fourth program page
  $scope.currentRemainingTuition = "";
  $scope.remainingMonths = "";
  $scope.fifthProgramForm = false;
  $scope.fourthNext = function(){
    $scope.currentRemainingTuition = Number($scope.currentRemainingTuition);
    $scope.totalWithInclusions = Number($scope.totalWithInclusions);
    $scope.totalWithInclusions = Math.round(($scope.totalTuition + $scope.currentRemainingTuition + $scope.uniform + $scope.equipment + $scope.promotion)*100)/100;
    $scope.fourthProgramForm = !$scope.fourthProgramForm;
    $scope.fifthProgramForm = !$scope.fifthProgramForm;
  }
  //fifth program page
  $scope.initialPayment = "";
  $scope.fourPayDiscount = .02;
  $scope.showInvestments = false;
  $scope.showInvestmentOptions = function(){
    $scope.initialPayment = Number($scope.initialPayment);
    $scope.fourPayDiscount = Number($scope.fourPayDiscount);
    $scope.newTuition = Number($scope.newTuition);
    $scope.balance = Math.round(($scope.totalWithInclusions - $scope.initialPayment)*100)/100;
    $scope.monthlyAmount = Math.round(($scope.balance/$scope.totalMonths)*100)/100;
    $scope.newTuition = Math.round(($scope.totalTuition - ($scope.totalTuition*$scope.fourPayDiscount))*100)/100;
    $scope.fourMonthly = Math.round((($scope.newTuition + $scope.totalPackage + $scope.currentRemainingTuition)/4)*100)/100;
    $scope.fourSavings = Math.round(($scope.totalTuition - $scope.newTuition)*100)/100;
    $scope.onePayTotal = Math.round(($scope.totalTuition - ($scope.totalTuition*.10) + $scope.totalPackage + $scope.currentRemainingTuition)*100)/100;
    $scope.oneSavings = Math.round(($scope.totalTuition*.10)*100)/100;
    $scope.onePayWithDiscount = Math.round(($scope.totalTuition - $scope.totalTuition*.1)*100)/100;
    $scope.fifthProgramForm = !$scope.fifthProgramForm;
    $scope.showInvestments = !$scope.showInvestments
  }
  //Sales
  $scope.homeTotal = function(sale){
    $http.get('/getSales', sale).then(function(response) {
      $scope.saleObject = {};
      $scope.saleArray = response.data;
      $scope.sum = function(items, prop){
    return items.reduce( function(a, b){
        return a + b[prop];
    }, 0);
};
$scope.moneyForMonth = $scope.sum($scope.saleArray, 'totalPrice');
    });
  }
  $scope.homeTotal();
  $scope.saleArray = [];
  $scope.saleObject = {};
  $scope.addSale = function(sale){
    $scope.sale.quanity = Number($scope.sale.quanity);
    $scope.sale.price = Number($scope.sale.price);
    $scope.sale.totalPrice = $scope.sale.quanity*$scope.sale.price;
    $http.post('/sale', sale).then($scope.homeTotal());
  }
}]);