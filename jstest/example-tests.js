module("Hello tests") ;
test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
  ok( 1 == 1, "Second assertion")
});

test( "hello test2", function() {
  ok( 1 < "2", "1 should be smaller than 2" );
});

test("hello test3", function() {
  ok(!(1 === "1"), "'1' as string should not be '===' to 1" );
});

module("Arithmetic tests") ;
test( "addition test", function() {
  ok( 1 + 1 === 2, "Passed!" );
});
test( "subtraction test", function() {
  ok( 5 - 4 === 1, "Passed!" );
});
