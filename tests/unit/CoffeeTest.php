<?php
use PHPUnit\Framework\TestCase;

class CoffeeTest extends TestCase
{
    public function testBasicMath()
    {
        $this->assertEquals(4, 2 + 2);
    }

    public function testStringContains()
    {
        $this->assertStringContainsString('coffee', 'I love coffee');
    }
}