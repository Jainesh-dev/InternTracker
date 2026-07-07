from apscheduler.schedulers.blocking import BlockingScheduler

from engine import run_engine

scheduler = BlockingScheduler()


scheduler.add_job(
    run_engine,
    "interval",
    seconds=20
)


print("=" * 50)
print("InternTracker Engine Scheduler Started")
print("Runs Every 3 Hours")
print("=" * 50)

run_engine()

scheduler.start()