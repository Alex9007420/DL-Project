import asyncio
import platform
if platform.system() == 'Windows':
   asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

async def test_async():
    print("Testing async functionality...")
    await asyncio.sleep(1)
    print("Async test completed.")

if __name__ == "__main__":
    asyncio.run(test_async())
